import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { noticeModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single notice
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notice = await noticeModel.getById(params.id)
    
    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, notice })

  } catch (error) {
    console.error("Notice fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch notice" },
      { status: 500 }
    )
  }
}

// PUT - Update notice
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const heading = formData.get('heading') as string
    const subheading = formData.get('subheading') as string
    const publishedDate = formData.get('publishedDate') as string
    const validUntil = formData.get('validUntil') as string
    const isActive = formData.get('isActive') === 'true'
    const featured = formData.get('featured') === 'true'
    const file = formData.get('file') as File

    if (!heading || !subheading || !publishedDate || !validUntil) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const updateData: any = {
      heading,
      subheading,
      publishedDate: new Date(publishedDate),
      validUntil: new Date(validUntil),
      isActive,
      featured
    }

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'notices')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      updateData.documentUrl = uploadResult.path
    }

    const updated = await noticeModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ 
        error: "Failed to update notice. Notice not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Notice updated successfully" 
    })

  } catch (error) {
    console.error("Notice update error:", error)
    return NextResponse.json(
      { error: "Failed to update notice" },
      { status: 500 }
    )
  }
}

// DELETE - Delete notice
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await noticeModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Notice deleted successfully" 
    })

  } catch (error) {
    console.error("Notice delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete notice" },
      { status: 500 }
    )
  }
}