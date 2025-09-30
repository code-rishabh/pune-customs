import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has admin role
    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    const { username, password, name, email, role } = await request.json()

    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db()
    const users = db.collection("admin_users")

    // Check if user already exists
    const existingUser = await users.findOne({ 
      $or: [{ username }, { email }] 
    })

    if (existingUser) {
      await client.close()
      return NextResponse.json(
        { error: "User with this username or email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = {
      username,
      password: hashedPassword,
      name,
      email,
      role: role || "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await users.insertOne(newUser)
    await client.close()

    return NextResponse.json({
      success: true,
      userId: result.insertedId,
      message: "Admin user created successfully"
    })

  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}