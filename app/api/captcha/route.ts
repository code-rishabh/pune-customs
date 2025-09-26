import { NextResponse } from "next/server"

// Simple CAPTCHA generator - creates math problems
function generateCaptcha() {
  const operations = ['+', '-', '*']
  const operation = operations[Math.floor(Math.random() * operations.length)]
  
  let num1: number, num2: number, answer: number
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1
      num2 = Math.floor(Math.random() * 50) + 1
      answer = num1 + num2
      break
    case '-':
      num1 = Math.floor(Math.random() * 50) + 25 // Ensure positive result
      num2 = Math.floor(Math.random() * 25) + 1
      answer = num1 - num2
      break
    case '*':
      num1 = Math.floor(Math.random() * 12) + 1
      num2 = Math.floor(Math.random() * 12) + 1
      answer = num1 * num2
      break
    default:
      num1 = 5
      num2 = 3
      answer = 8
  }
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer.toString()
  }
}

// In-memory storage for CAPTCHA answers (in production, use Redis or database)
const captchaStore = new Map<string, { answer: string; expires: number }>()

// Clean expired CAPTCHAs
function cleanExpiredCaptchas() {
  const now = Date.now()
  for (const [key, value] of captchaStore.entries()) {
    if (value.expires < now) {
      captchaStore.delete(key)
    }
  }
}

export async function GET() {
  try {
    cleanExpiredCaptchas()
    
    const captcha = generateCaptcha()
    const captchaId = Math.random().toString(36).substring(2, 15)
    const expires = Date.now() + 5 * 60 * 1000 // 5 minutes
    
    // Store the answer
    captchaStore.set(captchaId, { answer: captcha.answer, expires })
    
    return NextResponse.json({
      id: captchaId,
      question: captcha.question
    })
    
  } catch (error) {
    console.error("CAPTCHA generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate CAPTCHA" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { id, answer } = await request.json()
    
    if (!id || !answer) {
      return NextResponse.json(
        { error: "CAPTCHA ID and answer are required" },
        { status: 400 }
      )
    }
    
    cleanExpiredCaptchas()
    
    const storedCaptcha = captchaStore.get(id)
    
    if (!storedCaptcha) {
      return NextResponse.json(
        { error: "CAPTCHA expired or invalid" },
        { status: 400 }
      )
    }
    
    const isValid = storedCaptcha.answer === answer.toString().trim()
    
    // Remove the CAPTCHA after verification (single use)
    captchaStore.delete(id)
    
    return NextResponse.json({ valid: isValid })
    
  } catch (error) {
    console.error("CAPTCHA verification error:", error)
    return NextResponse.json(
      { error: "Failed to verify CAPTCHA" },
      { status: 500 }
    )
  }
}