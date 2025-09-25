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
import { MapPin, Phone, Mail, Clock, Send, User, Building } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message. We will get back to you soon!")
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      subject: "",
      category: "",
      message: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      title: "Main Office",
      address: "Pune Customs Office, Department of Revenue, Ministry of Finance, Government of India",
      phone: "+91-20-XXXX-XXXX",
      email: "info@punecustoms.gov.in",
      hours: "Monday - Friday: 9:30 AM - 6:00 PM",
    },
  ]

  const departments = [
    {
      name: "Import Section",
      head: "Shri Amit Patel",
      designation: "Deputy Commissioner (Import)",
      phone: "+91-20-XXXX-1003",
      email: "dc.import@punecustoms.gov.in",
    },
    {
      name: "Export Section",
      head: "Smt. Meera Joshi",
      designation: "Deputy Commissioner (Export)",
      phone: "+91-20-XXXX-1004",
      email: "dc.export@punecustoms.gov.in",
    },
    {
      name: "AEO Section",
      head: "Shri Rajesh Gupta",
      designation: "Assistant Commissioner (AEO)",
      phone: "+91-20-XXXX-1005",
      email: "aeo@punecustoms.gov.in",
    },
    {
      name: "Enforcement Section",
      head: "Smt. Priya Sharma",
      designation: "Additional Commissioner",
      phone: "+91-20-XXXX-1002",
      email: "enforcement@punecustoms.gov.in",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Get in touch with us for any queries, assistance, or information about our services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="import">Import Related</SelectItem>
                          <SelectItem value="export">Export Related</SelectItem>
                          <SelectItem value="aeo">AEO Certification</SelectItem>
                          <SelectItem value="broker">Customs Broker License</SelectItem>
                          <SelectItem value="warehouse">Warehousing</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Main Office Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Office Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span>{info.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>{info.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span>{info.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{info.hours}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                    <CardDescription>For urgent matters, contact us directly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Emergency Helpline</div>
                        <div className="text-sm text-muted-foreground">+91-20-XXXX-HELP</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Quick Response</div>
                        <div className="text-sm text-muted-foreground">urgent@punecustoms.gov.in</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Department Contacts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Contact specific departments directly for specialized assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{dept.head}</div>
                          <div className="text-sm text-muted-foreground">{dept.designation}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
