import { NextResponse } from "next/server"

export type SlidePayload = {
  image: string
  title: string
  description: string
}

let slides: SlidePayload[] = [
  {
    image: "/uploads/customs-office-operations.jpg",
    title: "Modern Customs Operations",
    description: "State-of-the-art facilities ensuring efficient trade facilitation",
  },
  {
    image: "/uploads/customs-enforcement-operation.jpg",
    title: "Enforcement & Compliance",
    description: "Maintaining security and compliance in international trade",
  },
  {
    image: "/uploads/government-workshop-meeting.jpg",
    title: "Stakeholder Engagement",
    description: "Regular consultations with trade partners and industry",
  },
  {
    image: "/uploads/digital-government-office-technology.jpg",
    title: "Digital Transformation",
    description: "Leveraging technology for seamless customs processes",
  },
]

export async function GET() {
  return NextResponse.json({ slides })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<SlidePayload>
    console.log("POST /api/slider received:", body)
    const image = typeof body.image === "string" ? body.image.trim() : ""
    const title = typeof body.title === "string" ? body.title.trim() : ""
    const description = typeof body.description === "string" ? body.description.trim() : ""
    console.log("Processed values:", { image, title, description })
    if (!image) {
      console.log("Missing required image field")
      return NextResponse.json({ error: "image is required" }, { status: 400 })
    }
    
    // Auto-generate title if not provided
    const finalTitle = title || `Slide ${slides.length + 1}`
    const finalDescription = description || "Custom slide"
    const newSlide = { image, title: finalTitle, description: finalDescription }
    slides.unshift(newSlide)
    console.log("Updated slides array:", slides)
    return NextResponse.json({ slides })
  } catch (error) {
    console.log("POST /api/slider error:", error)
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}


