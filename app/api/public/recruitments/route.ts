import { NextRequest, NextResponse } from "next/server"
import { recruitmentModel } from "@/models/notices-tenders"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    
    const recruitments = await recruitmentModel.getActiveRecruitments(
      limit ? parseInt(limit) : undefined
    )
    
    return NextResponse.json(recruitments)
  } catch (error) {
    console.error("Error fetching recruitments:", error)
    return NextResponse.json(
      { error: "Failed to fetch recruitments" },
      { status: 500 }
    )
  }
}
