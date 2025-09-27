import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tenderModel } from "@/models/notices-tenders"

// POST - Toggle featured status for tender
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await tenderModel.toggleFeatured(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle featured status. Tender not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Tender featured status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle tender featured status error:", error)
    return NextResponse.json(
      { error: "Failed to toggle tender featured status" },
      { status: 500 }
    )
  }
}