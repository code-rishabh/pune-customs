"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Star, Send, ThumbsUp, AlertCircle } from "lucide-react"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceUsed: "",
    overallRating: "",
    serviceQuality: "",
    staffBehavior: "",
    processEfficiency: "",
    improvements: [],
    comments: "",
    recommend: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your valuable feedback! We appreciate your input.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      serviceUsed: "",
      overallRating: "",
      serviceQuality: "",
      staffBehavior: "",
      processEfficiency: "",
      improvements: [],
      comments: "",
      recommend: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImprovementChange = (improvement: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      improvements: checked
        ? [...prev.improvements, improvement]
        : prev.improvements.filter((item) => item !== improvement),
    }))
  }

  const services = [
    "Import Clearance",
    "Export Clearance",
    "AEO Certification",
    "Customs Broker License",
    "Warehousing Services",
    "Duty Calculation",
    "General Inquiry",
    "Other",
  ]

  const improvementAreas = [
    "Faster processing times",
    "Better online services",
    "Improved staff training",
    "More transparent procedures",
    "Better communication",
    "Enhanced facilities",
    "Digital documentation",
    "Extended working hours",
  ]

  const StarRating = ({
    value,
    onChange,
    name,
  }: { value: string; onChange: (value: string) => void; name: string }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star.toString())}
          className={`p-1 ${
            Number.parseInt(value) >= star ? "text-yellow-500" : "text-gray-300"
          } hover:text-yellow-400 transition-colors`}
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Feedback</h1>
              <p className="text-xl text-muted-foreground">
                Your feedback helps us improve our services and better serve the community
              </p>
            </div>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Service Feedback Form
                  </CardTitle>
                  <CardDescription>
                    Please share your experience with our services. Your feedback is valuable to us and helps us
                    improve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization/Company</Label>
                          <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) => handleInputChange("organization", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Service Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="service">Which service did you use? *</Label>
                        <Select
                          value={formData.serviceUsed}
                          onValueChange={(value) => handleInputChange("serviceUsed", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select the service you used" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Ratings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Rate Our Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Overall Experience *</Label>
                          <StarRating
                            value={formData.overallRating}
                            onChange={(value) => handleInputChange("overallRating", value)}
                            name="overallRating"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Service Quality *</Label>
                          <StarRating
                            value={formData.serviceQuality}
                            onChange={(value) => handleInputChange("serviceQuality", value)}
                            name="serviceQuality"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Staff Behavior *</Label>
                          <StarRating
                            value={formData.staffBehavior}
                            onChange={(value) => handleInputChange("staffBehavior", value)}
                            name="staffBehavior"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Process Efficiency *</Label>
                          <StarRating
                            value={formData.processEfficiency}
                            onChange={(value) => handleInputChange("processEfficiency", value)}
                            name="processEfficiency"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Improvement Areas */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                      <p className="text-sm text-muted-foreground">
                        Select areas where you think we can improve (multiple selections allowed)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {improvementAreas.map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={area}
                              checked={formData.improvements.includes(area)}
                              onCheckedChange={(checked) => handleImprovementChange(area, checked as boolean)}
                            />
                            <Label htmlFor={area} className="text-sm">
                              {area}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Recommendation</h3>
                      <div className="space-y-2">
                        <Label>Would you recommend our services to others? *</Label>
                        <RadioGroup
                          value={formData.recommend}
                          onValueChange={(value) => handleInputChange("recommend", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="definitely" id="definitely" />
                            <Label htmlFor="definitely">Definitely</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="probably" id="probably" />
                            <Label htmlFor="probably">Probably</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="maybe" id="maybe" />
                            <Label htmlFor="maybe">Maybe</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="probably-not" id="probably-not" />
                            <Label htmlFor="probably-not">Probably Not</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="definitely-not" id="definitely-not" />
                            <Label htmlFor="definitely-not">Definitely Not</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Additional Comments</h3>
                      <div className="space-y-2">
                        <Label htmlFor="comments">
                          Please share any additional comments, suggestions, or specific experiences
                        </Label>
                        <Textarea
                          id="comments"
                          rows={6}
                          value={formData.comments}
                          onChange={(e) => handleInputChange("comments", e.target.value)}
                          placeholder="Your detailed feedback helps us understand how we can serve you better..."
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feedback Statistics */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your Voice Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here's how your feedback has helped us improve our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ThumbsUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">95%</CardTitle>
                  <CardDescription>Customer Satisfaction Rate</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">1,200+</CardTitle>
                  <CardDescription>Feedback Responses Received</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">48hrs</CardTitle>
                  <CardDescription>Average Response Time</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
