"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Captcha from "@/components/ui/captcha"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!captchaVerified) {
      toast.error("Please complete the security verification first.")
      return
    }
    
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.")
        setCaptchaVerified(false) // Reset CAPTCHA on failed login
        setIsLoading(false)
        return
      }

      if (result?.ok) {
        toast.success("Login successful!")
        router.push("/admin")
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Something went wrong. Please try again.")
      setCaptchaVerified(false) // Reset CAPTCHA on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCaptchaVerify = (isValid: boolean) => {
    setCaptchaVerified(isValid)
    if (isValid) {
      toast.success("Security verification completed!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
          <CardDescription>Pune Customs Administration Panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
            
            {/* CAPTCHA Component */}
            <Captcha 
              onVerify={handleCaptchaVerify}
              disabled={isLoading}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !captchaVerified}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Authorized personnel only. Please contact IT support if you need access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}