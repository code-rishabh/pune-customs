"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"

interface CaptchaProps {
  onVerify: (isValid: boolean) => void
  disabled?: boolean
}

export default function Captcha({ onVerify, disabled = false }: CaptchaProps) {
  const [captchaData, setCaptchaData] = useState<{ id: string; question: string } | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const loadCaptcha = async () => {
    setIsLoading(true)
    setError("")
    setUserAnswer("")
    
    try {
      const response = await fetch('/api/captcha')
      const data = await response.json()
      
      if (response.ok) {
        setCaptchaData(data)
      } else {
        setError("Failed to load CAPTCHA")
      }
    } catch (error) {
      setError("Failed to load CAPTCHA")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCaptcha = async () => {
    if (!captchaData || !userAnswer.trim()) {
      setError("Please solve the math problem")
      onVerify(false)
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: captchaData.id,
          answer: userAnswer.trim()
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        if (result.valid) {
          setError("")
          onVerify(true)
        } else {
          setError("Incorrect answer. Please try again.")
          onVerify(false)
          loadCaptcha() // Load new CAPTCHA
        }
      } else {
        setError(result.error || "Verification failed")
        onVerify(false)
      }
    } catch (error) {
      setError("Verification failed")
      onVerify(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Load initial CAPTCHA
  useEffect(() => {
    loadCaptcha()
  }, [])

  return (
    <div className="space-y-3">
      <Label>Security Verification</Label>
      <div className="p-4 border-2 border-dashed border-muted rounded-lg bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="font-mono text-lg font-semibold select-none">
                {captchaData?.question || "Loading..."}
              </div>
            )}
          </div>
          <Button 
            type="button"
            variant="ghost" 
            size="sm"
            onClick={loadCaptcha}
            disabled={isLoading || disabled}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isLoading || disabled}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              verifyCaptcha()
            }
          }}
        />
        <Button 
          type="button"
          variant="outline"
          onClick={verifyCaptcha}
          disabled={isLoading || disabled || !userAnswer.trim()}
        >
          Verify
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <p className="text-xs text-muted-foreground">
        Solve the math problem above to verify you're human
      </p>
    </div>
  )
}