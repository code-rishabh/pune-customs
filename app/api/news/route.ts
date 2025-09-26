import { NextResponse } from "next/server"

// Temporary in-memory data. Replace with DB/admin source later.
const items: string[] = [
  "New customs clearance guidelines effective from January 2024",
  "Online application system now available for all services",
  "Updated tariff rates published for Q1 2024",
  "Digital signature facility launched for importers",
  "Extended working hours during festival season",
  "New AEO certification process simplified",
]

export async function GET() {
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const value = typeof body === "string" ? body : body?.item
    const text = typeof value === "string" ? value.trim() : ""
    if (!text) {
      return NextResponse.json({ error: "Invalid item" }, { status: 400 })
    }
    // Add to the start so newest shows first
    items.unshift(text)
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}


