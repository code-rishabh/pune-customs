import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { newsModel } from "@/models/notices-tenders"

// GET - Fetch news
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active') === 'true' ? true : 
                    searchParams.get('active') === 'false' ? false : undefined
    const limit = parseInt(searchParams.get('limit') || '0') || undefined
    const search = searchParams.get('search')
    const isPublic = searchParams.get('public') === 'true'

    // Allow public access for active news only
    if (isPublic && isActive === true) {
      const news = await newsModel.getActiveNews(limit)
      return NextResponse.json({
        items: news.map(item => item.text)
      })
    }

    // Allow GET requests for all users (authenticated or not)
    // Only require authentication for admin-specific operations
    const session = await getServerSession(authOptions)
    
    let news

    if (search) {
      news = await newsModel.search(search, isActive)
    } else {
      news = await newsModel.getAll(isActive, limit)
    }

    return NextResponse.json({
      success: true,
      news,
      total: news.length
    })

  } catch (error) {
    console.error("News fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

// POST - Create new news
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { text, link, ranking, isActive } = body

    if (!text) {
      return NextResponse.json(
        { error: "Missing required field: text" },
        { status: 400 }
      )
    }

    const newsId = await newsModel.create({
      text,
      link: link || undefined,
      ranking: ranking || 1,
      isActive: isActive !== undefined ? isActive : true,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: newsId,
      message: "News created successfully" 
    })

  } catch (error) {
    console.error("News creation error:", error)
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    )
  }
}


