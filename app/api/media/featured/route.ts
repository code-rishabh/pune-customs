import { NextResponse } from "next/server"
import { mediaModel } from "@/models/media"

// GET - Fetch featured photos (public endpoint)
export async function GET() {
  try {
    const featuredPhotos = await mediaModel.getFeaturedPhotos()
    
    return NextResponse.json({
      success: true,
      photos: featuredPhotos
    })

  } catch (error) {
    console.error("Featured photos fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch featured photos" },
      { status: 500 }
    )
  }
}