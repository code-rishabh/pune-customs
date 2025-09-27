import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { achievementModel } from "@/models/notices-tenders"

// POST - Toggle active status for achievement
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await achievementModel.toggleActive(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle active status. Achievement not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Achievement active status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle achievement active status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle achievement active status" },
      { status: 500 }
    )
  }
}