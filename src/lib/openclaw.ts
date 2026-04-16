/**
 * openclaw.ts
 *
 * Downloads the OpenClaw AI package manifest from the npm registry,
 * keeps it in module-level memory (in-process cache), and exposes a
 * typed helper so any server-side code can read or print it.
 */

export interface OpenclawInfo {
  name: string;
  version: string;
  description: string;
  license: string;
  homepage?: string;
  repository?: { url: string };
  keywords?: string[];
  engines?: Record<string, string>;
  fetchedAt: string;
}

// Module-level cache — lives for the lifetime of the Node.js process.
let cached: OpenclawInfo | null = null;

const NPM_REGISTRY_URL = "https://registry.npmjs.org/openclaw/latest";

/**
 * Fetches OpenClaw metadata from the npm registry and stores it in memory.
 * Subsequent calls return the cached value without a network round-trip.
 */
export async function loadOpenclawInfo(): Promise<OpenclawInfo> {
  if (cached) return cached;

  const res = await fetch(NPM_REGISTRY_URL, {
    next: { revalidate: 3600 }, // Next.js: re-fetch at most once per hour
  });

  if (!res.ok) {
    throw new Error(`Failed to download openclaw info: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  cached = {
    name: data.name ?? "openclaw",
    version: data.version ?? "unknown",
    description: data.description ?? "",
    license: data.license ?? "",
    homepage: data.homepage,
    repository: data.repository,
    keywords: data.keywords,
    engines: data.engines,
    fetchedAt: new Date().toISOString(),
  };

  return cached;
}

/**
 * Returns the cached OpenClaw info without triggering a network fetch.
 * Returns null if loadOpenclawInfo() has not been called yet.
 */
export function getCachedOpenclawInfo(): OpenclawInfo | null {
  return cached;
}

/**
 * Prints the OpenClaw info to stdout (server-side console).
 * Loads from cache or fetches if not yet cached.
 */
export async function printOpenclawInfo(): Promise<void> {
  const info = await loadOpenclawInfo();
  console.log("[OpenClaw]", JSON.stringify(info, null, 2));
}
