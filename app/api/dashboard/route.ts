import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  noticeModel, 
  tenderModel, 
  newsModel, 
  sliderModel, 
  achievementModel,
  visitorModel 
} from "@/models/notices-tenders"

// GET - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get counts for all content types
    const [
      totalNotices,
      activeNotices,
      totalTenders, 
      activeTenders,
      totalNews,
      activeNews,
      totalSliders,
      activeSliders,
      totalAchievements,
      activeAchievements,
      totalVisitors,
      todayVisitors,
      visitorStats
    ] = await Promise.all([
      noticeModel.getAll().then(items => items.length),
      noticeModel.getAll(true).then(items => items.length),
      tenderModel.getAll().then(items => items.length),
      tenderModel.getAll(true).then(items => items.length),
      newsModel.getAll().then(items => items.length),
      newsModel.getAll(true).then(items => items.length),
      sliderModel.getAll().then(items => items.length),
      sliderModel.getAll(true).then(items => items.length),
      achievementModel.getAll().then(items => items.length),
      achievementModel.getAll(true).then(items => items.length),
      visitorModel.getTotalVisitors(),
      visitorModel.getTodayVisitors(),
      visitorModel.getVisitorStats(7)
    ])

    // Get recent activity (latest 5 items from each type)
    const [recentNotices, recentTenders, recentNews] = await Promise.all([
      noticeModel.getAll(undefined, 5),
      tenderModel.getAll(undefined, 5), 
      newsModel.getAll(undefined, 5)
    ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          notices: { total: totalNotices, active: activeNotices },
          tenders: { total: totalTenders, active: activeTenders },
          news: { total: totalNews, active: activeNews },
          sliders: { total: totalSliders, active: activeSliders },
          achievements: { total: totalAchievements, active: activeAchievements },
          visitors: { total: totalVisitors, today: todayVisitors }
        },
        visitorStats,
        recentActivity: {
          notices: recentNotices,
          tenders: recentTenders,
          news: recentNews
        }
      }
    })

  } catch (error) {
    console.error("Dashboard stats fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    )
  }
}