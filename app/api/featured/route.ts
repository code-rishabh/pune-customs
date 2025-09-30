import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

// GET - Fetch featured notices, tenders, and news for homepage
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const noticeLimit = parseInt(searchParams.get('noticeLimit') || '10')
    const tenderLimit = parseInt(searchParams.get('tenderLimit') || '10')
    const newsLimit = parseInt(searchParams.get('newsLimit') || '10')

    // Allow GET requests for all users (public access for featured content)
    // No authentication required for reading featured content

    await client.connect()
    const db = client.db()

    try {
      // Fetch featured notices
      const noticesCursor = db.collection('notices')
        .find({ 
          featured: true,
          isActive: true
        })
        .sort({ publishedDate: -1 })
        .limit(noticeLimit)

      // Fetch featured tenders
      const tendersCursor = db.collection('tenders')
        .find({ 
          featured: true,
          isActive: true
        })
        .sort({ publishedDate: -1 })
        .limit(tenderLimit)

      // Fetch featured news
      const newsCursor = db.collection('news')
        .find({ 
          featured: true,
          isActive: true
        })
        .sort({ createdAt: -1 })
        .limit(newsLimit)

      const [featuredNotices, featuredTenders, featuredNews] = await Promise.all([
        noticesCursor.toArray(),
        tendersCursor.toArray(),
        newsCursor.toArray()
      ])

      return NextResponse.json({
        success: true,
        data: {
          notices: featuredNotices,
          tenders: featuredTenders,
          news: featuredNews
        }
      })
    } finally {
      await client.close()
    }

  } catch (error) {
    console.error("Featured content fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch featured content" },
      { status: 500 }
    )
  }
}