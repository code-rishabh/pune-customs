import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// In-memory storage for website update tracking
// In production, this should be stored in a database
let lastUpdateInfo = {
  timestamp: new Date().toISOString(),
  activity: "Website initialized",
  adminUser: "System"
}

export async function GET() {
  try {
    // GET requests are allowed for all users (public information)
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
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has admin or editor role
    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json({ error: "Forbidden - Admin or Editor access required" }, { status: 403 })
    }

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
      adminUser: adminUser || session.user.name || session.user.username || "Admin"
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
