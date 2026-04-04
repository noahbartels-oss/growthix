import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!business) return NextResponse.json([]);

  const { data } = await supabase
    .from("channels")
    .select("id,type,external_id,status,created_at")
    .eq("business_id", business.id);

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const body = await req.json();
  const { type, external_id, access_token } = body;

  if (!type || !external_id) {
    return NextResponse.json({ error: "type and external_id required" }, { status: 400 });
  }

  // Upsert: replace existing channel of same type
  const { data: existing } = await supabase
    .from("channels")
    .select("id")
    .eq("business_id", business.id)
    .eq("type", type)
    .single();

  let result;
  if (existing) {
    result = await supabase
      .from("channels")
      .update({ external_id, access_token: access_token ?? null, status: "connected" })
      .eq("id", existing.id)
      .select("id,type,external_id,status")
      .single();
  } else {
    result = await supabase
      .from("channels")
      .insert({ business_id: business.id, type, external_id, access_token: access_token ?? null, status: "connected" })
      .select("id,type,external_id,status")
      .single();
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  return NextResponse.json(result.data);
}
