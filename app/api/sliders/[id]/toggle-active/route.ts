import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sliderModel } from "@/models/notices-tenders"

// POST - Toggle active status for slider
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await sliderModel.toggleActive(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle active status. Slider not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Slider active status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle slider active status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle slider active status" },
      { status: 500 }
    )
  }
}