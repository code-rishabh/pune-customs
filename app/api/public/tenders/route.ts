import { NextRequest, NextResponse } from "next/server"
import { tenderModel } from "@/models/notices-tenders"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    
    const tenders = await tenderModel.getActiveTenders(
      limit ? parseInt(limit) : undefined
    )
    
    return NextResponse.json(tenders)
  } catch (error) {
    console.error("Error fetching tenders:", error)
    return NextResponse.json(
      { error: "Failed to fetch tenders" },
      { status: 500 }
    )
  }
}
