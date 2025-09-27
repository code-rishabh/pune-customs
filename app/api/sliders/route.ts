import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { sliderModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch sliders
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

    let sliders

    if (search) {
      sliders = await sliderModel.search(search, isActive)
    } else {
      sliders = await sliderModel.getAll(isActive, limit)
    }

    return NextResponse.json({
      success: true,
      sliders,
      total: sliders.length
    })

  } catch (error) {
    console.error("Slider fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch sliders" },
      { status: 500 }
    )
  }
}

// POST - Create new slider
export async function POST(request: NextRequest) {
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

    let finalImageUrl = imageUrl

    // Handle file upload if provided
    if (file && file.size > 0) {
      const uploadResult = await defaultUploader.uploadFile(file, 'image', 'sliders')
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      
      finalImageUrl = uploadResult.path
    }

    if (!finalImageUrl) {
      return NextResponse.json(
        { error: "Either upload an image file or provide an image URL" },
        { status: 400 }
      )
    }

    const sliderId = await sliderModel.create({
      heading,
      description,
      imageUrl: finalImageUrl,
      link: link || undefined,
      priority,
      isActive,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: sliderId,
      message: "Slider created successfully" 
    })

  } catch (error) {
    console.error("Slider creation error:", error)
    return NextResponse.json(
      { error: "Failed to create slider" },
      { status: 500 }
    )
  }
}