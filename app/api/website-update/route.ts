import { NextRequest, NextResponse } from "next/server"

// In-memory storage for website update tracking
// In production, this should be stored in a database
let lastUpdateInfo = {
  timestamp: new Date().toISOString(),
  activity: "Website initialized",
  adminUser: "System"
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: lastUpdateInfo
    })
  } catch (error) {
    console.error("Error fetching website update info:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch update information" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { activity, adminUser } = body

    if (!activity) {
      return NextResponse.json(
        { success: false, error: "Activity description is required" },
        { status: 400 }
      )
    }

    // Update the last update information
    lastUpdateInfo = {
      timestamp: new Date().toISOString(),
      activity: activity,
      adminUser: adminUser || "Admin"
    }

    console.log("Website update tracked:", lastUpdateInfo)

    return NextResponse.json({
      success: true,
      data: lastUpdateInfo,
      message: "Website update tracked successfully"
    })
  } catch (error) {
    console.error("Error updating website info:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update website information" },
      { status: 500 }
    )
  }
}
