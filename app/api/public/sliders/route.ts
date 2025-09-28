import { NextRequest, NextResponse } from "next/server"
import { sliderModel } from "@/models/notices-tenders"

// GET - Fetch active sliders for public access
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '0') || undefined

    const sliders = await sliderModel.getActiveSliders(limit)

    return NextResponse.json({
      success: true,
      sliders,
      total: sliders.length
    })

  } catch (error) {
    console.error("Public sliders fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch sliders" },
      { status: 500 }
    )
  }
}
