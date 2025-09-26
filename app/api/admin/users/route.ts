import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db()
    const users = db.collection("admin_users")

    const adminUsers = await users.find({}, {
      projection: { password: 0 } // Don't return passwords
    }).toArray()

    await client.close()

    return NextResponse.json({ users: adminUsers })

  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const userId = url.searchParams.get('id')

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db()
    const users = db.collection("admin_users")

    // Prevent self-deletion
    if (userId === session.user.id) {
      await client.close()
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      )
    }

    const result = await users.deleteOne({ _id: new (require('mongodb').ObjectId)(userId) })
    await client.close()

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" })

  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    )
  }
}