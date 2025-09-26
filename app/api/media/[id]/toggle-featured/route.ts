import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mediaModel } from "@/lib/models/media"

// POST - Toggle featured status for photos
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const toggled = await mediaModel.toggleFeatured(params.id)

    if (!toggled) {
      return NextResponse.json({ 
        error: "Failed to toggle featured status. Item not found or not a photo." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Featured status updated successfully" 
    })

  } catch (error) {
    console.error("Toggle featured error:", error)
    return NextResponse.json(
      { error: "Failed to toggle featured status" },
      { status: 500 }
    )
  }
}