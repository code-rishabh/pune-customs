import { NextRequest, NextResponse } from "next/server"
import { mediaModel } from "@/lib/models/media"

// GET - Fetch media items by type (public endpoint)
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const mediaType = params.type as 'photo' | 'video' | 'document' | 'press'
    
    // Validate media type
    if (!['photo', 'video', 'document', 'press'].includes(mediaType)) {
      return NextResponse.json(
        { error: "Invalid media type. Use: photo, video, document, or press" },
        { status: 400 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '0') || undefined
    const search = searchParams.get('search')

    let items

    if (search) {
      items = await mediaModel.searchMedia(search, mediaType)
    } else {
      items = await mediaModel.getMediaByType(mediaType, limit)
    }

    return NextResponse.json({
      success: true,
      type: mediaType,
      items: items,
      total: items.length
    })

  } catch (error) {
    console.error(`Error fetching ${params.type} media:`, error)
    return NextResponse.json(
      { error: `Failed to fetch ${params.type} media` },
      { status: 500 }
    )
  }
}