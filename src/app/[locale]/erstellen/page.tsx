"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowRight, ArrowLeft, X } from "lucide-react";

/* ── Daten ───────────────────────────────────────────────────────────── */

const COMPANIES: Record<string, string[]> = {
  de: [
    "Adidas","Allianz","BASF","Bayer","Beiersdorf","BMW","Bosch","Brenntag",
    "Bundesagentur für Arbeit","Bundeswehr","Commerzbank","Continental",
    "Daimler Truck","Deloitte","Deutsche Bahn","Deutsche Bank","Deutsche Börse",
    "Deutsche Post / DHL","Deutsche Rentenversicherung","Deutsche Telekom",
    "dm-drogerie markt","E.ON","Edeka","Evonik","EY","Fraport","Fresenius",
    "Google Deutschland","Hannover Rück","Heidelberg Materials","Henkel",
    "IBM Deutschland","Infineon Technologies","ING Deutschland","KPMG",
    "Krupp / Thyssenkrupp","Lidl","Lufthansa","McKinsey & Company","MediaMarkt/Saturn",
    "Mercedes-Benz","Merck","Microsoft Deutschland","MTU Aero Engines","Munich Re",
    "Netto","Otto Group","Penny","Porsche","PwC","QIAGEN","Rewe Group","Rheinmetall",
    "Roland Berger","Rossmann","RWE","SAP SE","Sartorius","Schaeffler","Siemens",
    "Siemens Energy","Siemens Healthineers","Software AG","Sparkasse","Symrise",
    "Telefónica Deutschland","TUI Deutschland","Volkswagen","Vodafone Deutschland",
    "Vonovia","Zalando","ZF Friedrichshafen","1&1","Accenture","Airbus","Amazon",
    "Apple Deutschland","ALDI","Audi","Axel Springer","B. Braun","Capgemini",
    "Cisco","Covestro","DATEV","DKB","Ford Deutschland","Fresenius Kabi",
    "GEA Group","HUK-Coburg","Krones","KUKA","Lanxess","Linde","MAN",
    "Opel","Oracle Deutschland","ProSiebenSat.1","Salesforce","SEW-Eurodrive",
    "Stadtwerke (regional)","Stryker Deutschland","TRUMPF","Volkswagen Financial Services",
    "Wacker Chemie","Zeiss","ZDF","ARD/Rundfunk",
  ],
  at: [
    "A1 Telekom Austria","AMS (Arbeitsmarktservice)","Anton Paar","Austrian Airlines",
    "AVL List","Bawag Group","Billa / Rewe Austria","Blum","CA Immo","Deloitte Österreich",
    "Doka","Engel Austria","Erste Group Bank","Frequentis","Fronius","Greiner Group",
    "Hofer (Aldi Austria)","Immofinanz","Julius Meinl","Kapsch Group","KPMG Österreich",
    "KTM Industries","Liebherr Austria","Magenta Telekom","Manner","Mayr-Melnhof Karton",
    "McKinsey Wien","Microsoft Österreich","Mondi Austria","OMV","Österreichische Post",
    "Palfinger","Porsche Holding Austria","PwC Österreich","Raiffeisen Bank International",
    "Raiffeisenlandesbank","Red Bull","SAP Österreich","Siemens Österreich",
    "Spar Österreich","Sparkasse Österreich","Stadt Wien","Swarovski",
    "T-Systems Austria","Telekom Austria Group","Uniqa","Verbund",
    "Vienna Insurance Group","Voestalpine","Vöslauer","Wienerberger",
    "Wiener Linien","Wien Energie","Wirtschaftskammer Österreich",
    "Wolford","Zumtobel","Interspar","Penny Österreich",
  ],
};

const ALL_SKILLS = [
  // Programmierung
  "Python","Java","JavaScript","TypeScript","C++","C#","C","PHP","Ruby",
  "Swift","Kotlin","Go","Rust","Scala","R","MATLAB","VBA","Bash/Shell","PowerShell","Perl","Delphi",
  // Web
  "HTML","CSS","React","Angular","Vue.js","Next.js","Svelte","jQuery",
  "Bootstrap","Tailwind CSS","SASS/SCSS","Node.js","REST API","GraphQL","WebSockets","Webpack","Vite",
  // Backend / Frameworks
  "Django","Flask","FastAPI","Spring Boot",".NET","ASP.NET","Laravel","Express.js","NestJS","Symfony",
  // Datenbanken
  "SQL","MySQL","PostgreSQL","Oracle DB","Microsoft SQL Server",
  "MongoDB","Redis","Elasticsearch","SQLite","MariaDB","Cassandra","Firebase",
  // Cloud & DevOps
  "AWS","Microsoft Azure","Google Cloud (GCP)","Docker","Kubernetes",
  "Terraform","Ansible","Jenkins","GitLab CI/CD","GitHub Actions","Linux","Git","SVN",
  "CI/CD","Monitoring","Prometheus","Grafana","Nginx","Apache",
  // Microsoft Office
  "Microsoft Excel","Microsoft Word","Microsoft PowerPoint","Microsoft Outlook",
  "Microsoft Teams","Microsoft SharePoint","Microsoft Access","Microsoft 365","Microsoft Visio","OneNote",
  // ERP / CRM
  "SAP","SAP S/4HANA","SAP HR","SAP FI/CO","SAP MM","SAP SD","SAP WM",
  "Salesforce","Dynamics 365","Oracle ERP","HubSpot","Navision / Business Central","Odoo","DATEV","Lexware","Sage",
  // Design & Medien
  "Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe Premiere Pro",
  "Adobe After Effects","Adobe XD","Figma","Sketch","Canva","InVision","Blender","Cinema 4D","DaVinci Resolve",
  "Videobearbeitung","Fotografie","Bildbearbeitung","Grafikdesign","UX Design","UI Design","Webdesign",
  // CAD / Technik
  "AutoCAD","SolidWorks","CATIA","Inventor","Revit","SketchUp","MATLAB/Simulink","EPLAN","CADDY","Creo",
  // Daten & BI
  "Tableau","Power BI","QlikView","Looker","SPSS","SAS","Alteryx",
  "Machine Learning","Deep Learning","TensorFlow","PyTorch","Pandas","NumPy","scikit-learn","Data Science",
  // Projektmanagement
  "Scrum","Agile","Kanban","PRINCE2","PMP","Jira","Confluence",
  "Trello","Asana","Monday.com","MS Project","Projektplanung","Risikomanagement","Stakeholder-Management",
  // Marketing & Kommunikation
  "Google Analytics","Google Ads","Meta Ads","LinkedIn Ads","SEO","SEM","TikTok Ads",
  "Content Marketing","E-Mail-Marketing","Social Media Marketing","Mailchimp","HubSpot Marketing",
  "Texten","Copywriting","PR","Pressearbeit","Eventmanagement","Messe","Marktforschung","Produktmarketing",
  // Rechnungswesen / Finanzen
  "Buchführung","Finanzbuchhaltung","Controlling","Jahresabschluss","Bilanzierung",
  "Lohnbuchhaltung","Kostenrechnung","Wirtschaftsprüfung","Interne Revision",
  "Treasury","Liquiditätsplanung","Budgetplanung","Kreditanalyse","Steuerrecht","Umsatzsteuer",
  // HR & Personal
  "Recruiting","Personalwesen","Onboarding","Employer Branding","Arbeitsrecht","Payroll",
  "Personalentwicklung","Talentmanagement","Mitarbeitergespräche","Coaching","Ausbildungsbetreuung",
  // Vertrieb / Einkauf
  "B2B-Vertrieb","B2C-Vertrieb","Key Account Management","Kaltakquise","Telesales",
  "Einkauf","Supply Chain Management","Logistik","Zollabwicklung","Warehousing","Disposition",
  "Verhandlungsführung","Angebotserstellung","CRM-Pflege",
  // Kundenservice & Kommunikation
  "Kundenbetreuung","Call Center","Beschwerdemanagement","Ticketsystem","Zendesk","Freshdesk",
  "Technischer Support","Helpdesk","ITIL","Servicedesk","After-Sales",
  // Qualität / Prozesse
  "Qualitätsmanagement","ISO 9001","ISO 14001","ISO 27001","Lean Management","Six Sigma","Kaizen",
  "Prozessoptimierung","Auditierung","FMEA","8D-Methode","KVP",
  // Handwerk & Technik
  "Elektroinstallation","SPS-Programmierung","Steuerungstechnik","Automatisierungstechnik",
  "Hydraulik","Pneumatik","CNC-Programmierung","Schweißen (MAG/MIG/WIG)","Instandhaltung",
  "Gebäudetechnik","Klimatechnik","Sanitärinstallation","Heizungstechnik","Kältetechnik",
  "Schlosserarbeiten","Zerspanungstechnik","Messtechnik","Prüftechnik","Hochspannungstechnik",
  // Gesundheit & Pflege
  "Krankenpflege","Altenpflege","Pflegedokumentation","Medikamentengabe","Wundversorgung",
  "Erste Hilfe","Notfallmedizin","OP-Assistenz","Physiotherapie","Ergotherapie","Logopädie",
  "Medizinische Fachangestellte","Praxismanagement","Abrechnung (EBM/GOÄ)","Arztassistenz",
  // Gastronomie & Hotellerie
  "Küche / Kochen","HACCP","Barista","Barkeeper","Servicefachkraft","Eventgastronomie",
  "Rezeption","Housekeeping","Reservierungssysteme","Revenue Management","F&B Management",
  // Soziales & Pädagogik
  "Sozialpädagogik","Sozialarbeit","Beratung","Gruppenleitung","Krisenintervention",
  "Kindererziehung","Kindergartenpädagogik","Schulbegleitung","Inklusionspädagogik",
  "Jugendarbeit","Suchtberatung","Eingliederungshilfe",
  // Recht & Compliance
  "Vertragsrecht","Handelsrecht","Gesellschaftsrecht","Arbeitsrecht","Datenschutz (DSGVO)",
  "Compliance","Geldwäscheprävention","Vergaberecht","Öffentliches Recht","Steuerstrafrecht",
  // Immobilien & Bau
  "Immobilienvermittlung","Mietrecht","Wohnungswirtschaft","Bauleitung","Bauplanung",
  "Kalkulation","Ausschreibung","VOB","Facility Management","Gebäudeverwaltung",
  // Logistik & Transport
  "Lagerlogistik","Kommissionierung","Gabelstapler","LKW-Führerschein (CE)","Tourenplanung",
  "Sendungsverfolgung","Gefahrguttransport (ADR)","Importabwicklung","Exportabwicklung",
  // Sicherheit
  "Bewachung","Objektschutz","Personenschutz","Veranstaltungsschutz","Brandschutz",
  "Arbeitssicherheit","Sicherheitsbeauftragter",
  // Soft Skills
  "Teamfähigkeit","Kommunikationsstärke","Führungskompetenz","Problemlösungskompetenz",
  "Analytisches Denken","Kreativität","Selbstständiges Arbeiten","Zuverlässigkeit",
  "Flexibilität","Belastbarkeit","Lernbereitschaft","Empathie",
  "Verhandlungsgeschick","Präsentationstechnik","Zeitmanagement","Kundenorientierung",
  "Konfliktlösung","Eigeninitiative","Organisationstalent","Detailgenauigkeit",
  // Sprachen
  "Englisch (fließend)","Englisch (verhandlungssicher)","Englisch (Grundkenntnisse)",
  "Deutsch (Muttersprache)","Deutsch (C1/C2)","Französisch","Spanisch","Italienisch","Russisch",
  "Chinesisch (Mandarin)","Arabisch","Türkisch","Niederländisch","Polnisch","Portugiesisch",
  "Kroatisch","Serbisch","Rumänisch","Ungarisch","Tschechisch","Griechisch","Japanisch","Koreanisch",
];


/* ── Typen ───────────────────────────────────────────────────────────── */

interface FormData {
  name: string;
  country: "de" | "at";
  situation: string;
  experience: string;
  skills: string[];
  extra: string;
  company: string;
  position: string;
  jobDesc: string;
  motivation: string;
}

const initial: FormData = {
  name: "", country: "de", situation: "employed", experience: "1-2",
  skills: [], extra: "", company: "", position: "", jobDesc: "", motivation: "",
};

/* ── Styles ──────────────────────────────────────────────────────────── */

const baseInput: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.18)", borderRadius: 0,
  color: "#fff", fontSize: "0.95rem", padding: "0.55rem 0", outline: "none",
  fontFamily: "'Manrope',system-ui,sans-serif", transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const baseSelect: React.CSSProperties = {
  ...baseInput,
  background: "#13131f",
  padding: "0.55rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid rgba(255,255,255,0.18)",
  borderBottom: "1px solid rgba(255,255,255,0.18)",
  cursor: "pointer",
  appearance: "none" as const,
};

const baseLabel: React.CSSProperties = {
  display: "block", fontFamily: "'JetBrains Mono',monospace",
  fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.35rem",
};

/* ── Searchable single-select ────────────────────────────────────────── */
function SearchSelect({
  value, onChange, options, placeholder,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filtered = options
    .filter(o => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        className="bki-input"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); onChange(""); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={baseInput}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#13131f", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "0.5rem", maxHeight: "200px", overflowY: "auto", zIndex: 50,
        }}>
          {filtered.map(o => (
            <div
              key={o}
              onClick={() => { onChange(o); setQuery(o); setOpen(false); }}
              style={{
                padding: "0.55rem 0.875rem", fontSize: "0.875rem",
                color: o === value ? "var(--primary)" : "rgba(255,255,255,0.75)",
                cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Searchable multi-select ─────────────────────────────────────────── */
function SkillSelect({
  value, onChange,
}: { value: string[]; onChange: (v: string[]) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filtered = ALL_SKILLS
    .filter(s => s.toLowerCase().includes(query.toLowerCase()) && !value.includes(s));

  function add(skill: string) {
    onChange([...value, skill]);
    setQuery("");
  }
  function remove(skill: string) { onChange(value.filter(s => s !== skill)); }

  return (
    <div ref={ref}>
      {/* Tags */}
      {value.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
          {value.map(s => (
            <span key={s} style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.78rem",
              background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.25)",
              color: "rgba(0,230,118,0.9)", fontFamily: "'Manrope',sans-serif",
            }}>
              {s}
              <button
                type="button" onClick={() => remove(s)}
                style={{ background: "none", border: "none", cursor: "pointer",
                  color: "rgba(0,230,118,0.6)", padding: 0, lineHeight: 1, fontSize: "0.9rem" }}>
                <X style={{ width: "11px", height: "11px" }} />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Search input */}
      <div style={{ position: "relative" }}>
        <input
          className="bki-input"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Fähigkeit suchen und hinzufügen …"
          style={baseInput}
          autoComplete="off"
        />
        {open && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
            background: "#13131f", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "0.5rem", maxHeight: "200px", overflowY: "auto", zIndex: 50,
          }}>
            {filtered.map(s => (
              <div
                key={s}
                onClick={() => add(s)}
                style={{
                  padding: "0.5rem 0.875rem", fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.75)", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function ErstellenPage() {
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const router = useRouter();

  function set<K extends keyof FormData>(field: K) {
    return (val: FormData[K]) => setForm(prev => ({ ...prev, [field]: val }));
  }
  function setEv(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function goNext() {
    if (!form.name.trim() || form.skills.length === 0) {
      setError("Bitte fülle Name aus und wähle mindestens eine Fähigkeit.");
      return;
    }
    setError(null); setStep(2); window.scrollTo({ top: 0 });
  }

  async function generate() {
    if (!form.company.trim() || !form.position.trim()) {
      setError("Bitte gib Unternehmen und Stelle an."); return;
    }
    setLoading(true); setError(null);

    let sessionId = localStorage.getItem("bki_session");
    if (!sessionId) { sessionId = crypto.randomUUID(); localStorage.setItem("bki_session", sessionId); }

    try {
      const res  = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skills: form.skills.join(", "), sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fehler");
      router.push(`/ergebnis/${data.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fehler"); setLoading(false);
    }
  }

  /* ── Render ── */
  return (
    <>
      <style>{`
        .bki-input:focus { border-bottom-color: var(--primary) !important; }
        .bki-input::placeholder { color: rgba(255,255,255,0.22); }
        @keyframes bki-progress { from { width:0% } to { width:90% } }
      `}</style>

      <div className="mesh-bg" style={{ background: "#080810", minHeight: "100vh", color: "#fff", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "#fff" }}>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: "rgba(0,230,118,0.12)", border: "1px solid rgba(0,230,118,0.25)" }}>
                <FileText className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
              </div>
              <span className="font-syne font-bold text-sm">BewerbungsKI</span>
            </Link>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-jetbrains text-[10px] text-white/35 tracking-widest uppercase">Schritt {step} / 2</span>
              <div className="relative rounded-full overflow-hidden" style={{ width: "80px", height: "2px", background: "rgba(255,255,255,0.1)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", background: "var(--primary)",
                  width: step === 1 ? "50%" : "100%", transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="glass" style={{ borderRadius: "1.25rem", padding: "2.25rem 2rem" }}>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="font-jetbrains text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>Schritt 01</p>
                <h1 className="font-syne font-black text-white text-2xl mb-1">Deine Angaben</h1>
                <p className="text-sm text-white/40 mb-8">Damit die KI einen individuellen Brief schreiben kann.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <div>
                    <label style={baseLabel}>Vollständiger Name *</label>
                    <input className="bki-input" type="text" value={form.name} onChange={setEv("name")} placeholder="Max Mustermann" style={baseInput} />
                  </div>

                  <div>
                    <label style={baseLabel}>Aktuelle Situation *</label>
                    <select className="bki-input" value={form.situation} onChange={setEv("situation")} style={baseSelect}>
                      <option value="employed" style={{ background: "#13131f", color: "#fff" }}>Berufstätig (Jobwechsel)</option>
                      <option value="student"   style={{ background: "#13131f", color: "#fff" }}>Student / Studentin</option>
                      <option value="apprentice" style={{ background: "#13131f", color: "#fff" }}>Auszubildende/r</option>
                      <option value="seeking"   style={{ background: "#13131f", color: "#fff" }}>Arbeitssuchend</option>
                    </select>
                  </div>

                  <div>
                    <label style={baseLabel}>Berufserfahrung</label>
                    <select className="bki-input" value={form.experience} onChange={setEv("experience")} style={baseSelect}>
                      <option value="none"  style={{ background: "#13131f", color: "#fff" }}>Keine Erfahrung</option>
                      <option value="1-2"   style={{ background: "#13131f", color: "#fff" }}>1–2 Jahre</option>
                      <option value="3-5"   style={{ background: "#13131f", color: "#fff" }}>3–5 Jahre</option>
                      <option value="5plus" style={{ background: "#13131f", color: "#fff" }}>Mehr als 5 Jahre</option>
                    </select>
                  </div>

                  <div>
                    <label style={baseLabel}>Fähigkeiten & Kenntnisse * <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(mehrere möglich)</span></label>
                    <SkillSelect value={form.skills} onChange={set("skills")} />
                  </div>

                  <div>
                    <label style={{ ...baseLabel }}>Was macht dich besonders? <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                    <textarea className="bki-input" value={form.extra} onChange={setEv("extra")}
                      placeholder="Eigenes Projekt, 3 Sprachen, …"
                      style={{ ...baseInput, resize: "vertical", minHeight: "52px" }} />
                  </div>
                </div>

                {error && <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>{error}</p>}

                <button onClick={goNext}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--primary)", color: "#080810" }}>
                  Weiter zur Stelle <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && !loading && (
              <div className="animate-fade-in">
                <p className="font-jetbrains text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>Schritt 02</p>
                <h1 className="font-syne font-black text-white text-2xl mb-1">Die Stelle</h1>
                <p className="text-sm text-white/40 mb-8">Je mehr du angibst, desto besser wird der Brief.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                  {/* Land */}
                  <div>
                    <label style={baseLabel}>Land *</label>
                    <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.25rem" }}>
                      {(["de", "at"] as const).map(c => (
                        <button key={c} type="button"
                          onClick={() => { set("country")(c); set("company")(""); }}
                          style={{
                            flex: 1, padding: "0.55rem", borderRadius: "0.5rem", fontSize: "0.875rem",
                            fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                            background: form.country === c ? "rgba(0,230,118,0.15)" : "rgba(255,255,255,0.04)",
                            border: form.country === c ? "1px solid rgba(0,230,118,0.4)" : "1px solid rgba(255,255,255,0.1)",
                            color: form.country === c ? "rgba(0,230,118,0.95)" : "rgba(255,255,255,0.5)",
                          }}>
                          {c === "de" ? "Deutschland" : "Österreich"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Unternehmen */}
                  <div>
                    <label style={baseLabel}>Unternehmen *</label>
                    <SearchSelect
                      value={form.company}
                      onChange={set("company")}
                      options={COMPANIES[form.country]}
                      placeholder="Unternehmen suchen …"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label style={baseLabel}>Stelle / Position *</label>
                    <input className="bki-input" type="text" value={form.position} onChange={setEv("position")}
                      placeholder="Junior Software Engineer" style={baseInput} />
                  </div>

                  {/* Stellenbeschreibung */}
                  <div>
                    <label style={baseLabel}>Stellenbeschreibung <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(empfohlen)</span></label>
                    <textarea className="bki-input" value={form.jobDesc} onChange={setEv("jobDesc")}
                      placeholder="Anforderungen aus der Stellenanzeige einfügen …"
                      style={{ ...baseInput, resize: "vertical", minHeight: "100px" }} />
                  </div>

                  {/* Motivation */}
                  <div>
                    <label style={baseLabel}>Persönliche Motivation <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                    <textarea className="bki-input" value={form.motivation} onChange={setEv("motivation")}
                      placeholder="Warum willst du genau diese Stelle?"
                      style={{ ...baseInput, resize: "vertical", minHeight: "52px" }} />
                  </div>
                </div>

                {error && <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>{error}</p>}

                <div className="flex gap-3 mt-8">
                  <button onClick={() => { setStep(1); setError(null); window.scrollTo({ top: 0 }); }}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}>
                    <ArrowLeft className="h-4 w-4" /> Zurück
                  </button>
                  <button onClick={generate}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: "var(--primary)", color: "#080810" }}>
                    Brief erstellen ✨
                  </button>
                </div>
              </div>
            )}

            {/* ── Loading ── */}
            {loading && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-16 gap-6">
                <div className="typing-indicator"><span /><span /><span /></div>
                <div className="text-center">
                  <p className="font-syne font-bold text-white text-lg mb-1">KI schreibt deinen Brief …</p>
                  <p className="font-jetbrains text-xs text-white/35 tracking-wide">GPT-4 · ca. 15–30 Sekunden</p>
                </div>
                <div className="w-full max-w-xs rounded-full overflow-hidden" style={{ height: "2px", background: "rgba(255,255,255,0.08)" }}>
                  <div style={{ height: "100%", background: "var(--primary)", borderRadius: "1px", animation: "bki-progress 20s linear forwards" }} />
                </div>
              </div>
            )}
          </div>

          {!loading && (
            <p className="mt-5 text-center font-jetbrains text-[10px] text-white/22 tracking-wide uppercase">
              Kostenlos · Nur 6,99 € zum Download · Keine Anmeldung
            </p>
          )}
        </div>
      </div>
    </>
  );
}
