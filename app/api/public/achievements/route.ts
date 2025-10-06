import { NextRequest, NextResponse } from "next/server"
import { achievementModel } from "@/models/notices-tenders"

export const dynamic = 'force-dynamic'

// GET - Fetch active achievements for public access
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '0') || undefined

    const achievements = await achievementModel.getActiveAchievements(limit)

    return NextResponse.json({
      success: true,
      achievements,
      total: achievements.length
    })

  } catch (error) {
    console.error("Public achievements fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    )
  }
}
