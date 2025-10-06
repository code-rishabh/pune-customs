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
  Scale,
  CheckCircle,
  ArrowRight,
  FileCheck,
  UserCheck,
  ArrowDown,
  Ribbon,
} from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { ImageSlider } from "@/components/image-slider"
import { NewsFlash } from "@/components/news-flash"
import { getNewsForHomepage, getNoticesForHomepage, getSlidersForHomepage, getNewsItemsClient, getMediaByType, News, Notice, Slider, MediaItem } from "@/lib/news"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FeaturedNoticesTenders } from "@/components/featured-notices-tenders"

export function HomePage() {
  const { t } = useTranslation()
  const [newsData, setNewsData] = useState<News[]>([])
  const [newsFlashData, setNewsFlashData] = useState<News[]>([])
  const [noticesData, setNoticesData] = useState<Notice[]>([])
  const [slidersData, setSlidersData] = useState<Slider[]>([])
  const [galleryData, setGalleryData] = useState<MediaItem[]>([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingNewsFlash, setLoadingNewsFlash] = useState(true)
  const [loadingNotices, setLoadingNotices] = useState(true)
  const [loadingSliders, setLoadingSliders] = useState(true)
  const [loadingGallery, setLoadingGallery] = useState(true)

  // Fetch all data for homepage
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch news data for Latest Updates panel
        const news = await getNewsForHomepage()
        setNewsData(news)
        setLoadingNews(false)

        // Fetch news flash data (same as News Flash component)
        const newsFlash = await getNewsForHomepage()
        setNewsFlashData(newsFlash)
        setLoadingNewsFlash(false)

        // Fetch notices data
        const notices = await getNoticesForHomepage()
        setNoticesData(notices)
        setLoadingNotices(false)

        // Fetch sliders data
        const sliders = await getSlidersForHomepage()
        setSlidersData(sliders)
        setLoadingSliders(false)

        // Fetch gallery photos data
        const galleryPhotos = await getMediaByType('photo', 4)
        setGalleryData(galleryPhotos)
        setLoadingGallery(false)
      } catch (error) {
        console.error("Failed to fetch homepage data:", error)
        setLoadingNews(false)
        setLoadingNewsFlash(false)
        setLoadingNotices(false)
        setLoadingSliders(false)
        setLoadingGallery(false)
      }
    }
    fetchAllData()
  }, [])


  const quickServices = [
    {
      title: "Import/Export Forms",
      description: "Download and submit customs forms online",
      icon: FileCheck,
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
      icon: UserCheck,
      href: "/brokers",
    },
    {
      title: "Tariff Information",
      description: "Access latest tariff rates and classifications",
      icon: ArrowDown,
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
      icon: Ribbon,
      href: "/aeo",
    },
    {
      title: "e-SANCHIT",
      description: "Electronic delivery of customs documents",
      icon: Globe,
      href: "/e-sanchit",
    },
  ]


  const quickLinks = [
    { title: t("ndbs.act"), href: "/ndbs-act", icon: Scale },
    { title: t("rules"), href: "/rules", icon: BookOpen },
    { title: t("citizen.charter"), href: "/citizen-charter", icon: FileText },
    { title: t("rti.information"), href: "/rti", icon: BookOpen },
  ]

  return (
    <main className="flex-1">
      {/* News Flash */}
      <NewsFlash />

      {/* Hero Section with Image Slider and Quick Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Image Slider - Reduced Size */}
            <div className="lg:col-span-2">
              <ImageSlider />
            </div>
            
            {/* Quick Stats Dashboard */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">1,247</div>
                      <div className="text-xs text-muted-foreground">Applications Today</div>
                    </div>
                    <div className="text-center p-3 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">2.3 hrs</div>
                      <div className="text-xs text-muted-foreground">Avg. Processing</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹45.2M</div>
                      <div className="text-xs text-muted-foreground">Revenue This Month</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <div className="text-xs text-muted-foreground">Active Notices</div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <Link href="/track">
                          <Search className="h-4 w-4 mr-2" />
                          Track Application
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <Link href="/calculator">
                          <Calculator className="h-4 w-4 mr-2" />
                          Duty Calculator
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <Link href="/vessel-search">
                          <Globe className="h-4 w-4 mr-2" />
                          Vessel Search
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Emergency Contact */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Emergency Contact</h4>
                    <div className="text-xs text-muted-foreground">
                      <p>Helpline: +91-20-2612-3456</p>
                      <p>Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Quick Access and Important Links relocated below slider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <Card className="govt-card">
              <CardHeader className="pb-0">
                <CardTitle className="govt-section-header flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t("quick.access")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 -mt-10">
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

            <Card className="govt-card">
              <CardHeader className="pb-0">
                <CardTitle className="govt-section-header flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("important.links")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 -mt-10">
                <Link href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  CBIC Official Website
                </Link>
                <Link href="https://www.dgft.gov.in/CP/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  DGFT Portal
                </Link>
                <Link href="https://www.icegate.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  ICEGATE Portal
                </Link>
                <Link href="https://cblms.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  CB LMS Portal
                </Link>
                <Link href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  RTI Online Portal
                </Link>
                <Link href="https://pgportal.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">
                  Public Grievance Portal
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="govt-title text-3xl mb-4">{t("nav.services")}</h2>
            <p className="govt-subtitle text-muted-foreground max-w-2xl mx-auto">
              {t("quick.services.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Card
                key={index}
                className="govt-card hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">{t("latest.notices.tenders")}</h2>
            <p className="text-muted-foreground">{t("latest.notices.subtitle")}</p>
          </div>
          <FeaturedNoticesTenders latestUpdates={newsFlashData} />
        </div>
      </section>

      {/* Photo Gallery - Separate Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Photo Gallery</h2>
            <p className="text-muted-foreground">Explore our latest photos and events</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                {loadingGallery ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-muted animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                ) : galleryData.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryData.map((photo, index) => (
                      <div key={photo._id || index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={photo.link || "/placeholder.svg"}
                          alt={photo.heading}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No photos available</p>
                  </div>
                )}
                <div className="text-center mt-8">
                  <Button variant="outline" asChild>
                    <Link href="/gallery">View All Photos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Achievements removed as per new requirements */}

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
