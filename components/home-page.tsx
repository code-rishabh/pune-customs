"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  FileText,
  Users,
  TrendingUp,
  Download,
  Calendar,
  AlertCircle,
  Calculator,
  Search,
  Globe,
  Shield,
  Clock,
  Award,
  Camera,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { ImageSlider } from "@/components/image-slider"
import { NewsFlash } from "@/components/news-flash"
import Image from "next/image"

export function HomePage() {
  const { t } = useTranslation()

  const latestNotices = [
    {
      id: 1,
      title: "Important Notice regarding Import/Export Procedures",
      date: "2024-01-15",
      type: "Notice",
      urgent: true,
    },
    {
      id: 2,
      title: "Tender for Office Equipment Supply",
      date: "2024-01-12",
      type: "Tender",
      urgent: false,
    },
    {
      id: 3,
      title: "New Guidelines for Customs Clearance",
      date: "2024-01-10",
      type: "Guideline",
      urgent: false,
    },
    {
      id: 4,
      title: "AEO Certification Workshop Announcement",
      date: "2024-01-08",
      type: "Event",
      urgent: false,
    },
  ]

  const quickServices = [
    {
      title: "Import/Export Forms",
      description: "Download and submit customs forms online",
      icon: FileText,
      href: "/forms",
    },
    {
      title: "Track Application",
      description: "Track your application status in real-time",
      icon: TrendingUp,
      href: "/track",
    },
    {
      title: "Customs Brokers",
      description: "Find registered customs brokers",
      icon: Users,
      href: "/brokers",
    },
    {
      title: "Tariff Information",
      description: "Access latest tariff rates and classifications",
      icon: Download,
      href: "/tariff",
    },
    {
      title: "Duty Calculator",
      description: "Calculate customs duty for your goods",
      icon: Calculator,
      href: "/calculator",
    },
    {
      title: "Vessel Search",
      description: "Search vessel arrival and departure",
      icon: Search,
      href: "/vessel-search",
    },
    {
      title: "AEO Services",
      description: "Authorized Economic Operator services",
      icon: Award,
      href: "/aeo",
    },
    {
      title: "e-SANCHIT",
      description: "Electronic delivery of customs documents",
      icon: Globe,
      href: "/e-sanchit",
    },
  ]

  const galleryImages = [
    { src: "/government-celebration-ceremony.jpg", title: "Annual Customs Day Celebration" },
    { src: "/warehouse-inspection-government.jpg", title: "Warehouse Inspection Drive" },
    { src: "/government-workshop-meeting.jpg", title: "Stakeholder Meeting" },
    { src: "/digital-government-office-technology.jpg", title: "Digital Infrastructure" },
  ]

  const quickLinks = [
    { title: "RTI Information", href: "/rti", icon: BookOpen },
    { title: "Grievance Portal", href: "/grievance", icon: AlertCircle },
    { title: "Citizen Charter", href: "/citizen-charter", icon: FileText },
    { title: "Contact Directory", href: "/contact", icon: Phone },
  ]

  return (
    <main className="flex-1">
      {/* News Flash */}
      <NewsFlash />

      {/* Hero Section with Image Slider */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Slider */}
            <div className="lg:col-span-2">
              <ImageSlider />
            </div>

            {/* Quick Access Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Quick Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <link.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{link.title}</span>
                      <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Important Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/cbic" className="block text-sm text-primary hover:underline">
                    CBIC Official Website
                  </Link>
                  <Link href="/icegate" className="block text-sm text-primary hover:underline">
                    ICEGATE Portal
                  </Link>
                  <Link href="/gst" className="block text-sm text-primary hover:underline">
                    GST Portal
                  </Link>
                  <Link href="/ftp" className="block text-sm text-primary hover:underline">
                    Foreign Trade Policy
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Online Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all customs services digitally with our comprehensive online platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <Link href={service.href}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm">{service.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices & News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Notices */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-2">Latest Notices & Tenders</h2>
                  <p className="text-muted-foreground">Stay updated with our latest announcements</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/notices">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestNotices.map((notice) => (
                  <Card key={notice.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant={notice.type === "Tender" ? "default" : "secondary"}>{notice.type}</Badge>
                        {notice.urgent && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">{notice.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(notice.date).toLocaleDateString("en-IN")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* What's New & Gallery Preview */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    What's New
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-sm font-medium">Digital Signature Facility</p>
                      <p className="text-xs text-muted-foreground">Now available for all importers</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="text-sm font-medium">Extended Working Hours</p>
                      <p className="text-xs text-muted-foreground">During festival season</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <p className="text-sm font-medium">AEO Certification</p>
                      <p className="text-xs text-muted-foreground">Process simplified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href="/gallery">View All Photos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Performance</h2>
            <p className="opacity-90 max-w-2xl mx-auto">
              Delivering excellence in customs services with measurable results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="opacity-80">Applications Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-80">Registered Importers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="opacity-80">Online Services</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="opacity-80">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Helpline: +91-20-2612-3456</p>
                <p className="text-sm">Fax: +91-20-2612-3457</p>
                <p className="text-sm">Emergency: +91-20-2612-3458</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">General: info@punecustoms.gov.in</p>
                <p className="text-sm">Grievance: grievance@punecustoms.gov.in</p>
                <p className="text-sm">RTI: rti@punecustoms.gov.in</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Mon-Fri: 9:30 AM - 6:00 PM</p>
                <p className="text-sm">Saturday: 9:30 AM - 1:00 PM</p>
                <p className="text-sm">Emergency: 24/7 Available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
