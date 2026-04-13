import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/* ── Rate limiting (in-memory, per IP) ─────────────────────────────── */
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT   = 5;   // max requests
const RATE_WINDOW  = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

/* ── Allowed enum values ────────────────────────────────────────────── */
const ALLOWED_SITUATIONS  = new Set(["employed", "student", "apprentice", "seeking"]);
const ALLOWED_EXPERIENCES = new Set(["none", "1-2", "3-5", "5plus"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sanitize(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, maxLen).replace(/[<>]/g, ""); // strip < > to prevent HTML injection
}

export async function POST(req: NextRequest) {
  try {
    /* ── Check env vars early ── */
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing: OPENAI_API_KEY");
      return NextResponse.json({ error: "Server-Konfigurationsfehler: OpenAI API Key fehlt" }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing: Supabase credentials");
      return NextResponse.json({ error: "Server-Konfigurationsfehler: Datenbank nicht konfiguriert" }, { status: 500 });
    }

    /* ── Rate limit ── */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte warte eine Stunde." },
        { status: 429 }
      );
    }

    const body = await req.json();

    /* ── Validate & sanitize inputs ── */
    const name       = sanitize(body.name, 120);
    const situation  = sanitize(body.situation, 20);
    const experience = sanitize(body.experience, 10);
    const skills     = sanitize(body.skills, 800);
    const extra      = sanitize(body.extra, 500);
    const company    = sanitize(body.company, 120);
    const position   = sanitize(body.position, 120);
    const jobDesc    = sanitize(body.jobDesc, 2000);
    const motivation = sanitize(body.motivation, 800);
    const sessionId  = sanitize(body.sessionId, 36);

    if (!name || !skills || !company || !position || !sessionId) {
      return NextResponse.json({ error: "Fehlende Pflichtfelder" }, { status: 400 });
    }
    if (!UUID_RE.test(sessionId)) {
      return NextResponse.json({ error: "Ungültige Session" }, { status: 400 });
    }
    if (!ALLOWED_SITUATIONS.has(situation)) {
      return NextResponse.json({ error: "Ungültige Situation" }, { status: 400 });
    }
    if (!ALLOWED_EXPERIENCES.has(experience)) {
      return NextResponse.json({ error: "Ungültige Erfahrungsangabe" }, { status: 400 });
    }

    const situationMap: Record<string, string> = {
      employed:   "aktuell berufstätig (Jobwechsel angestrebt)",
      student:    "Student/Studentin",
      apprentice: "in Ausbildung",
      seeking:    "arbeitssuchend",
    };
    const expMap: Record<string, string> = {
      none:  "keine Berufserfahrung",
      "1-2": "1–2 Jahre Berufserfahrung",
      "3-5": "3–5 Jahre Berufserfahrung",
      "5plus": "über 5 Jahre Berufserfahrung",
    };

    const today = new Date().toLocaleDateString("de-DE", {
      year: "numeric", month: "long", day: "numeric",
    });

    const userPrompt = `Schreibe ein vollständiges, professionelles Bewerbungsschreiben auf Deutsch.

ANGABEN ZUM BEWERBER:
- Name: ${name}
- Situation: ${situationMap[situation]}
- Erfahrung: ${expMap[experience]}
- Fähigkeiten/Kenntnisse: ${skills}
${extra ? `- Besonderheiten: ${extra}` : ""}

ZIELSTELLE:
- Unternehmen: ${company}
- Position: ${position}
${jobDesc ? `- Stellenbeschreibung:\n${jobDesc}` : ""}
${motivation ? `- Persönliche Motivation: ${motivation}` : ""}

FORMAT (exakt so ausgeben):
[Ort], ${today}

Betreff: Bewerbung als ${position}

Sehr geehrte Damen und Herren,

[Einleitungsabsatz: Warum diese Stelle / dieses Unternehmen – konkret und individuell]

[Hauptteil 1: Relevante Qualifikationen, Erfahrungen und Fähigkeiten]

[Hauptteil 2: Was ich einbringe / Mehrwert für das Unternehmen]

[Schlussabsatz: Einladung zum Gespräch, Verfügbarkeit]

Mit freundlichen Grüßen
${name}

REGELN:
- Individuell auf Stelle UND Unternehmen zugeschnitten – keine generischen Floskeln
- Kein "Hiermit bewerbe ich mich" als Einstieg
- Überzeugend, konkret, authentisch
- Ca. 380–450 Wörter
- Sauberes Deutsch ohne Fehler`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein erfahrener Karriereberater. Du schreibst präzise, professionelle und überzeugende Bewerbungsschreiben auf Deutsch. Keine Floskeln, kein generisches Copy-Paste.",
        },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1200,
      temperature: 0.72,
    });

    const content = completion.choices[0].message.content ?? "";

    const supabase = getSupabase();
    const { data: doc, error } = await supabase
      .from("documents")
      .insert({
        session_id: sessionId,
        type: "bewerbungsschreiben",
        input_data: { name, situation, experience, skills, extra, company, position, jobDesc, motivation },
        content,
        is_paid: false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
    }

    return NextResponse.json({ id: doc.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Generate error:", msg);
    return NextResponse.json(
      { error: `Interner Fehler: ${msg.slice(0, 120)}` },
      { status: 500 }
    );
  }
}
