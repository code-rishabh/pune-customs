import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

// GET - Fetch featured notices and tenders for homepage
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const noticeLimit = parseInt(searchParams.get('noticeLimit') || '5')
    const tenderLimit = parseInt(searchParams.get('tenderLimit') || '5')

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

      const [featuredNotices, featuredTenders] = await Promise.all([
        noticesCursor.toArray(),
        tendersCursor.toArray()
      ])

      return NextResponse.json({
        success: true,
        data: {
          notices: featuredNotices,
          tenders: featuredTenders
        }
      })
    } finally {
      await client.close()
    }

  } catch (error) {
    console.error("Featured items fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch featured items" },
      { status: 500 }
    )
  }
}