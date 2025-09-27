import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sliderModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single slider
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const slider = await sliderModel.getById(params.id)
    
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, slider })

  } catch (error) {
    console.error("Slider fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch slider" },
      { status: 500 }
    )
  }
}

// PUT - Update slider
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const heading = formData.get('heading') as string
    const description = formData.get('description') as string
    const imageUrl = formData.get('imageUrl') as string
    const link = formData.get('link') as string
    const priority = parseInt(formData.get('priority') as string) || 1
    const isActive = formData.get('isActive') === 'true'
    const file = formData.get('file') as File

    if (!heading || !description) {
      return NextResponse.json(
        { error: "Missing required fields: heading and description" },
        { status: 400 }
      )
    }

    const updateData: any = {
      heading,
      description,
      link: link || undefined,
      priority,
      isActive
    }

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'image', 'sliders')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      updateData.imageUrl = uploadResult.path
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl
    }

    const updated = await sliderModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ 
        error: "Failed to update slider. Slider not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Slider updated successfully" 
    })

  } catch (error) {
    console.error("Slider update error:", error)
    return NextResponse.json(
      { error: "Failed to update slider" },
      { status: 500 }
    )
  }
}

// DELETE - Delete slider
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await sliderModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Slider deleted successfully" 
    })

  } catch (error) {
    console.error("Slider delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete slider" },
      { status: 500 }
    )
  }
}