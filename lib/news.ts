export type NewsItemsResponse = {
  items: string[]
}

// Server-side helper; could be replaced by DB call later
export async function getNewsItemsServer(): Promise<string[]> {
  // In real implementation, fetch from database or CMS
  // For now, call the same in-memory endpoint to keep a single source
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/news`, {
      // Ensure this never caches on server between requests during dev
      cache: "no-store",
    })
    if (!res.ok) return []
    const data = (await res.json()) as NewsItemsResponse
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}

// Client-side helper; use relative path
export async function getNewsItemsClient(): Promise<string[]> {
  try {
    const res = await fetch("/api/news", { cache: "no-store" })
    if (!res.ok) return []
    const data = (await res.json()) as NewsItemsResponse
    return Array.isArray(data.items) ? data.items : []
  } catch {
    return []
  }
}


