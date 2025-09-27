import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { achievementModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single achievement
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const achievement = await achievementModel.getById(params.id)
    
    if (!achievement) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, achievement })

  } catch (error) {
    console.error("Achievement fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch achievement" },
      { status: 500 }
    )
  }
}

// PUT - Update achievement
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
      priority,
      isActive
    }

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'image', 'achievements')
      
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

    const updated = await achievementModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ 
        error: "Failed to update achievement. Achievement not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Achievement updated successfully" 
    })

  } catch (error) {
    console.error("Achievement update error:", error)
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    )
  }
}

// DELETE - Delete achievement
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await achievementModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Achievement deleted successfully" 
    })

  } catch (error) {
    console.error("Achievement delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    )
  }
}