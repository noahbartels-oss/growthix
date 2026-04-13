import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: doc, error } = await supabase
    .from("documents")
    .select("id, type, input_data, content, is_paid, created_at")
    .eq("id", id)
    .single();

  if (error || !doc) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }

  if (!doc.is_paid) {
    const lines = (doc.content as string).split("\n").filter((l) => l.trim());
    const preview = lines.slice(0, 8).join("\n\n");
    return NextResponse.json({
      id: doc.id,
      inputData: doc.input_data,
      preview,
      content: null,
      isPaid: false,
    });
  }

  return NextResponse.json({
    id: doc.id,
    inputData: doc.input_data,
    preview: null,
    content: doc.content,
    isPaid: true,
  });
}
