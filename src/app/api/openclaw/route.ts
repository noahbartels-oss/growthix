import { NextResponse } from "next/server";
import { loadOpenclawInfo, printOpenclawInfo } from "@/lib/openclaw";

/**
 * GET /api/openclaw
 *
 * Downloads the OpenClaw AI manifest into memory on first call (cached
 * for the process lifetime), prints it to the server console, and
 * returns it as JSON.
 */
export async function GET() {
  try {
    // Load into memory and print to server console
    await printOpenclawInfo();

    // Return the cached data to the caller
    const info = await loadOpenclawInfo();
    return NextResponse.json({ ok: true, data: info });
  } catch (error) {
    console.error("[OpenClaw] fetch error:", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 502 }
    );
  }
}
