import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { newsModel } from "@/models/notices-tenders"

// GET - Fetch single news
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const news = await newsModel.getById(params.id)
    
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, news })

  } catch (error) {
    console.error("News fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

// PUT - Update news
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updated = await newsModel.update(params.id, {
      text,
      link: link || undefined,
      ranking: ranking || 1,
      isActive
    })

    if (!updated) {
      return NextResponse.json({ 
        error: "Failed to update news. News not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "News updated successfully" 
    })

  } catch (error) {
    console.error("News update error:", error)
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    )
  }
}

// DELETE - Delete news
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await newsModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "News deleted successfully" 
    })

  } catch (error) {
    console.error("News delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    )
  }
}