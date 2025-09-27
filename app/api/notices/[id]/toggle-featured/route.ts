import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { noticeModel } from "@/models/notices-tenders"

// POST - Toggle featured status for notice
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await noticeModel.toggleFeatured(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle featured status. Notice not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Notice featured status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle notice featured status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle notice featured status" },
      { status: 500 }
    )
  }
}