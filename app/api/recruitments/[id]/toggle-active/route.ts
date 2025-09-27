import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { recruitmentModel } from "@/models/notices-tenders"

// POST - Toggle active status for recruitment
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await recruitmentModel.toggleActive(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle active status. Recruitment not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Recruitment status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle recruitment status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle recruitment status" },
      { status: 500 }
    )
  }
}