import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tenderModel } from "@/lib/models/notices-tenders"
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
    const estimatedValue = parseFloat(formData.get('estimatedValue') as string)
    const tenderNo = formData.get('tenderNo') as string
    const isActive = formData.get('isActive') === 'true'
    const file = formData.get('file') as File

    const existingTender = await tenderModel.getById(params.id)
    if (!existingTender) {
      return NextResponse.json({ error: "Tender not found" }, { status: 404 })
    }

    let documentUrl = existingTender.documentUrl

    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'tenders')
      if (!uploadResult.success) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 })
      }
      documentUrl = uploadResult.path
    }

    const updateData = {
      heading: heading || existingTender.heading,
      description: description || existingTender.description,
      publishedDate: publishedDate ? new Date(publishedDate) : existingTender.publishedDate,
      lastDate: lastDate ? new Date(lastDate) : existingTender.lastDate,
      openingDate: openingDate ? new Date(openingDate) : existingTender.openingDate,
      estimatedValue: estimatedValue || existingTender.estimatedValue,
      tenderNo: tenderNo || existingTender.tenderNo,
      documentUrl,
      isActive
    }

    const updated = await tenderModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ error: "Failed to update tender" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Tender updated successfully" })

  } catch (error) {
    console.error("Tender update error:", error)
    return NextResponse.json({ error: "Failed to update tender" }, { status: 500 })
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