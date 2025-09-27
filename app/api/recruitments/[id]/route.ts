import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { recruitmentModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch single recruitment
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const recruitment = await recruitmentModel.getById(params.id)
    
    if (!recruitment) {
      return NextResponse.json({ error: "Recruitment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, recruitment })

  } catch (error) {
    console.error("Recruitment fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch recruitment" }, { status: 500 })
  }
}

// PUT - Update recruitment
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
    const file = formData.get('file') as File

    const existingRecruitment = await recruitmentModel.getById(params.id)
    if (!existingRecruitment) {
      return NextResponse.json({ error: "Recruitment not found" }, { status: 404 })
    }

    let documentUrl = existingRecruitment.documentUrl

    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'recruitments')
      if (!uploadResult.success) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 })
      }
      documentUrl = uploadResult.path
    }

    const updateData = {
      heading: heading || existingRecruitment.heading,
      subheading: subheading || existingRecruitment.subheading,
      publishedDate: publishedDate ? new Date(publishedDate) : existingRecruitment.publishedDate,
      validUntil: validUntil ? new Date(validUntil) : existingRecruitment.validUntil,
      documentUrl,
      isActive
    }

    const updated = await recruitmentModel.update(params.id, updateData)

    if (!updated) {
      return NextResponse.json({ error: "Failed to update recruitment" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Recruitment updated successfully" })

  } catch (error) {
    console.error("Recruitment update error:", error)
    return NextResponse.json({ error: "Failed to update recruitment" }, { status: 500 })
  }
}

// DELETE - Delete recruitment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deleted = await recruitmentModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Recruitment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Recruitment deleted successfully" })

  } catch (error) {
    console.error("Recruitment delete error:", error)
    return NextResponse.json({ error: "Failed to delete recruitment" }, { status: 500 })
  }
}