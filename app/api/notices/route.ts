import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { noticeModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch notices
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active') === 'true' ? true : 
                    searchParams.get('active') === 'false' ? false : undefined
    const limit = parseInt(searchParams.get('limit') || '0') || undefined
    const search = searchParams.get('search')

    let notices

    if (search) {
      notices = await noticeModel.search(search, isActive)
    } else {
      notices = await noticeModel.getAll(isActive, limit)
    }

    return NextResponse.json({
      success: true,
      notices,
      total: notices.length
    })

  } catch (error) {
    console.error("Notice fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 }
    )
  }
}

// POST - Create new notice
export async function POST(request: NextRequest) {
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

    let documentUrl

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'notices')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      documentUrl = uploadResult.path
    }

    const noticeId = await noticeModel.create({
      heading,
      subheading,
      publishedDate: new Date(publishedDate),
      validUntil: new Date(validUntil),
      documentUrl,
      isActive,
      featured,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: noticeId,
      message: "Notice created successfully" 
    })

  } catch (error) {
    console.error("Notice creation error:", error)
    return NextResponse.json(
      { error: "Failed to create notice" },
      { status: 500 }
    )
  }
}