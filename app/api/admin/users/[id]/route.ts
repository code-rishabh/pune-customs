import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, role, password } = await request.json()
    const userId = params.id

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email, and role are required" },
        { status: 400 }
      )
    }

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db()
    const users = db.collection("admin_users")

    const updateData: any = {
      name,
      email,
      role,
      updatedAt: new Date()
    }

    // Only update password if provided
    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password, 12)
    }

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    )

    await client.close()

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "User updated successfully" })

  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
}