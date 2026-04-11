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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, situation, experience, skills, extra, company, position, jobDesc, motivation, sessionId } = body;

    if (!name || !skills || !company || !position || !sessionId) {
      return NextResponse.json({ error: "Fehlende Pflichtfelder" }, { status: 400 });
    }

    const situationMap: Record<string, string> = {
      employed: "aktuell berufstätig (Jobwechsel angestrebt)",
      student: "Student/Studentin",
      apprentice: "in Ausbildung",
      seeking: "arbeitssuchend",
    };

    const expMap: Record<string, string> = {
      none: "keine Berufserfahrung",
      "1-2": "1–2 Jahre Berufserfahrung",
      "3-5": "3–5 Jahre Berufserfahrung",
      "5plus": "über 5 Jahre Berufserfahrung",
    };

    const today = new Date().toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const userPrompt = `Schreibe ein vollständiges, professionelles Bewerbungsschreiben auf Deutsch.

ANGABEN ZUM BEWERBER:
- Name: ${name}
- Situation: ${situationMap[situation] ?? situation}
- Erfahrung: ${expMap[experience] ?? experience}
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
- Saubers Deutsch ohne Fehler`;

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
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
