import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mediaModel } from "@/models/media"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single media item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mediaItem = await mediaModel.getMediaById(params.id)
    
    if (!mediaItem) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    return NextResponse.json(mediaItem)

  } catch (error) {
    console.error("Media fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch media item" },
      { status: 500 }
    )
  }
}

// PUT - Update media item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const heading = formData.get('heading') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const externalLink = formData.get('link') as string
    const file = formData.get('file') as File
    const featured = formData.get('featured') === 'true'

    const existingMedia = await mediaModel.getMediaById(params.id)
    if (!existingMedia) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    let finalLink = externalLink || existingMedia.link

    // If new file is uploaded, handle the upload
    if (file && file.size > 0) {
      const uploadType = existingMedia.type === 'photo' ? 'image' : 
                        existingMedia.type === 'video' ? 'video' : 'document'
      const uploadResult = await defaultUploader.uploadFile(file, uploadType, existingMedia.type + 's')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      finalLink = uploadResult.path!
    }

    const updateData: any = {
      heading: heading || existingMedia.heading,
      description: description || existingMedia.description,
      date: date ? new Date(date) : existingMedia.date,
      link: finalLink
    }

    if (existingMedia.type === 'photo') {
      updateData.featured = featured
    }

    const updated = await mediaModel.updateMedia(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ error: "Failed to update media item" }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Media item updated successfully" 
    })

  } catch (error) {
    console.error("Media update error:", error)
    return NextResponse.json(
      { error: "Failed to update media item" },
      { status: 500 }
    )
  }
}

// DELETE - Delete media item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await mediaModel.deleteMedia(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Media item deleted successfully" 
    })

  } catch (error) {
    console.error("Media delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete media item" },
      { status: 500 }
    )
  }
}