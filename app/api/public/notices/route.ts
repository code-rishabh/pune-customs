import { NextRequest, NextResponse } from "next/server"
import { noticeModel } from "@/models/notices-tenders"

// GET - Fetch active notices for public access
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '0') || undefined
    const featured = searchParams.get('featured') === 'true'

    let notices

    if (featured) {
      notices = await noticeModel.getFeatured(limit)
    } else {
      notices = await noticeModel.getActiveNotices(limit)
    }

    return NextResponse.json({
      success: true,
      notices,
      total: notices.length
    })

  } catch (error) {
    console.error("Public notices fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 }
    )
  }
}
