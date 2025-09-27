import { NextRequest, NextResponse } from "next/server"
import { visitorModel } from "@/models/notices-tenders"

// POST - Track visitor
export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || "unknown"
    
    await visitorModel.incrementVisitorCount(ip)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Visitor tracking error:", error)
    return NextResponse.json(
      { error: "Failed to track visitor" },
      { status: 500 }
    )
  }
}

// GET - Get visitor stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    
    const [totalVisitors, todayVisitors, stats] = await Promise.all([
      visitorModel.getTotalVisitors(),
      visitorModel.getTodayVisitors(),
      visitorModel.getVisitorStats(days)
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        todayVisitors,
        stats
      }
    })
  } catch (error) {
    console.error("Visitor stats fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch visitor stats" },
      { status: 500 }
    )
  }
}


