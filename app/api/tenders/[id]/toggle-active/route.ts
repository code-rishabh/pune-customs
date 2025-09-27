import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tenderModel } from "@/models/notices-tenders"

// POST - Toggle active status for tender
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await tenderModel.toggleActive(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle active status. Tender not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Tender status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle tender status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle tender status" },
      { status: 500 }
    )
  }
}