import { NextResponse } from "next/server"
import { writeFile, mkdir } from "node:fs/promises"
import { randomUUID } from "node:crypto"
import { join } from "node:path"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = file.name.split(".").pop() || "bin"
    const fileName = `${randomUUID()}.${ext}`
    const uploadDir = join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    const publicPath = `/uploads/${fileName}`
    return NextResponse.json({ path: publicPath, name: file.name, size: file.size, type: file.type })
  } catch (e) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}


