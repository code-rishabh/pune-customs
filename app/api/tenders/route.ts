import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { tenderModel } from "@/lib/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch tenders
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

    let tenders

    if (search) {
      tenders = await tenderModel.search(search, isActive)
    } else {
      tenders = await tenderModel.getAll(isActive, limit)
    }

    return NextResponse.json({
      success: true,
      tenders,
      total: tenders.length
    })

  } catch (error) {
    console.error("Tender fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch tenders" },
      { status: 500 }
    )
  }
}

// POST - Create new tender
export async function POST(request: NextRequest) {
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

    if (!heading || !description || !publishedDate || !lastDate || !openingDate || !tenderNo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    let documentUrl

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'document', 'tenders')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      documentUrl = uploadResult.path
    }

    const tenderId = await tenderModel.create({
      heading,
      description,
      publishedDate: new Date(publishedDate),
      lastDate: new Date(lastDate),
      openingDate: new Date(openingDate),
      estimatedValue: estimatedValue || 0,
      tenderNo,
      documentUrl,
      isActive,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: tenderId,
      message: "Tender created successfully" 
    })

  } catch (error) {
    console.error("Tender creation error:", error)
    return NextResponse.json(
      { error: "Failed to create tender" },
      { status: 500 }
    )
  }
}