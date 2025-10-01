import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tenderModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single tender
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tender = await tenderModel.getById(params.id)
    
    if (!tender) {
      return NextResponse.json({ error: "Tender not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, tender })

  } catch (error) {
    console.error("Tender fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch tender" }, { status: 500 })
  }
}

// PUT - Update tender
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const heading = formData.get('heading') as string
    const description = formData.get('description') as string
    const publishedDate = formData.get('publishedDate') as string
    const lastDate = formData.get('lastDate') as string
    const openingDate = formData.get('openingDate') as string
    const tenderNo = formData.get('tenderNo') as string
    const isActive = formData.get('isActive') === 'true'
    const featured = formData.get('featured') === 'true'
    const file = formData.get('file') as File

    if (!heading || !description || !publishedDate || !lastDate || !openingDate || !tenderNo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const updateData: any = {
      heading,
      description,
      publishedDate: new Date(publishedDate),
      lastDate: new Date(lastDate),
      openingDate: new Date(openingDate),
      tenderNo,
      isActive,
      featured
    }

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'tenders')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      updateData.documentUrl = uploadResult.path
    }

    const updated = await tenderModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ 
        error: "Failed to update tender. Tender not found." 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Tender updated successfully" 
    })

  } catch (error) {
    console.error("Tender update error:", error)
    return NextResponse.json(
      { error: "Failed to update tender" },
      { status: 500 }
    )
  }
}

// DELETE - Delete tender
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await tenderModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Tender not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Tender deleted successfully" })

  } catch (error) {
    console.error("Tender delete error:", error)
    return NextResponse.json({ error: "Failed to delete tender" }, { status: 500 })
  }
}