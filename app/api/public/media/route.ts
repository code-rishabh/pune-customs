import { NextRequest, NextResponse } from "next/server"
import { mediaModel } from "@/models/media"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'photo' | 'video' | 'document' | 'press' | null
    const limit = searchParams.get('limit')
    
    let result
    
    if (type) {
      const items = await mediaModel.getMediaByType(type, limit ? parseInt(limit) : undefined)
      result = { items, total: items.length }
    } else {
      result = await mediaModel.getAllMedia(1, limit ? parseInt(limit) : 50)
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    )
  }
}
