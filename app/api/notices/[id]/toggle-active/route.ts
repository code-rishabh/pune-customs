import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { noticeModel } from "@/lib/models/notices-tenders"

// POST - Toggle active status for notice
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await noticeModel.toggleActive(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle active status. Notice not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Notice status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle notice status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle notice status" },
      { status: 500 }
    )
  }
}