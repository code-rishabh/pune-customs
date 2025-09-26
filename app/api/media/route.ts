import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mediaModel } from "@/lib/models/media"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch media items
export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   console.log("No session found in media API")
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // console.log("Session found:", session.user?.username)

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'photo' | 'video' | 'document' | 'press' | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    let result

    if (search) {
      const items = await mediaModel.searchMedia(search, type || undefined)
      result = { items, total: items.length }
    } else if (type) {
      const items = await mediaModel.getMediaByType(type)
      result = { items, total: items.length }
    } else {
      result = await mediaModel.getAllMedia(page, limit)
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error("Media fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    )
  }
}

// POST - Create new media item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const type = formData.get('type') as 'photo' | 'video' | 'document' | 'press'
    const heading = formData.get('heading') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const externalLink = formData.get('link') as string
    const file = formData.get('file') as File
    const featured = formData.get('featured') === 'true'

    if (!type || !heading || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    let finalLink = externalLink

    // If file is uploaded, handle the upload
    if (file && file.size > 0) {
      const uploadType = type === 'photo' ? 'image' : type === 'video' ? 'video' : 'document'
      const uploadResult = await defaultUploader.uploadFile(file, uploadType, type + 's')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      finalLink = uploadResult.path!
    }

    if (!finalLink) {
      return NextResponse.json(
        { error: "Either file upload or external link is required" },
        { status: 400 }
      )
    }

    const mediaId = await mediaModel.createMedia({
      type,
      heading,
      description,
      date: new Date(date),
      link: finalLink,
      featured: type === 'photo' ? featured : undefined,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: mediaId,
      message: "Media item created successfully" 
    })

  } catch (error) {
    console.error("Media creation error:", error)
    return NextResponse.json(
      { error: "Failed to create media item" },
      { status: 500 }
    )
  }
}