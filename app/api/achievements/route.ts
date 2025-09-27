import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { achievementModel } from "@/models/notices-tenders"
import { defaultUploader } from "@/utils/upload"

// GET - Fetch achievements
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

    let achievements

    if (search) {
      achievements = await achievementModel.search(search, isActive)
    } else {
      achievements = await achievementModel.getAll(isActive, limit)
    }

    return NextResponse.json({
      success: true,
      achievements,
      total: achievements.length
    })

  } catch (error) {
    console.error("Achievement fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    )
  }
}

// POST - Create new achievement
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
      const uploadResult = await defaultUploader.uploadFile(file, 'image', 'achievements')
      
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

    const achievementId = await achievementModel.create({
      heading,
      description,
      imageUrl: finalImageUrl,
      priority,
      isActive,
      uploadedBy: session.user.id
    })

    return NextResponse.json({ 
      success: true, 
      id: achievementId,
      message: "Achievement created successfully" 
    })

  } catch (error) {
    console.error("Achievement creation error:", error)
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    )
  }
}