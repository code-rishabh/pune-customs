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
import { AchievementsCarousel } from "@/components/achievements-carousel"
import { getNewsForHomepage, getNoticesForHomepage, getSlidersForHomepage, getAchievementsForHomepage, getNewsItemsClient, getMediaByType, News, Notice, Slider, Achievement, MediaItem } from "@/lib/news"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FeaturedNoticesTenders } from "@/components/featured-notices-tenders"

export function HomePage() {
  const { t } = useTranslation()
  const [newsData, setNewsData] = useState<News[]>([])
  const [newsFlashData, setNewsFlashData] = useState<News[]>([])
  const [noticesData, setNoticesData] = useState<Notice[]>([])
  const [slidersData, setSlidersData] = useState<Slider[]>([])
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([])
  const [galleryData, setGalleryData] = useState<MediaItem[]>([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingNewsFlash, setLoadingNewsFlash] = useState(true)
  const [loadingNotices, setLoadingNotices] = useState(true)
  const [loadingSliders, setLoadingSliders] = useState(true)
  const [loadingAchievements, setLoadingAchievements] = useState(true)
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

        // Fetch achievements data
        const achievements = await getAchievementsForHomepage()
        setAchievementsData(achievements)
        setLoadingAchievements(false)

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
        setLoadingAchievements(false)
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Notices */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-2">{t("latest.notices.tenders")}</h2>
                  <p className="text-muted-foreground">{t("latest.notices.subtitle")}</p>
                </div>
                {/* <Button variant="outline" asChild>
                  <Link href="/notices">{t("view.all")}</Link>
                </Button> */}
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadingNotices ? (
                  // Loading skeleton
                  Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="h-5 bg-muted rounded w-16"></div>
                          <div className="h-5 bg-muted rounded w-12"></div>
                        </div>
                        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </CardContent>
                    </Card>
                  ))
                ) : noticesData.length > 0 ? (
                  noticesData.map((notice) => (
                    <Card key={notice._id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant={notice.featured ? "default" : "secondary"}>
                            {notice.featured ? "Featured" : "Notice"}
                          </Badge>
                          {new Date(notice.validUntil) > new Date() && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Active
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight">{notice.heading}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {notice.subheading}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(notice.publishedDate).toLocaleDateString("en-IN")}
                          </div>
                          {notice.documentUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={notice.documentUrl} target="_blank" rel="noopener noreferrer">
                                Download
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No notices available</p>
                  </div>
                )}
              </div> */}
              <FeaturedNoticesTenders />
            </div>

            {/* What's New & Gallery Preview */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    {t("latest.updates")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loadingNewsFlash ? (
                    <div className="space-y-3">
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                      </div>
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-4/5 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/5"></div>
                      </div>
                    </div>
                  ) : newsFlashData.length > 0 ? (
                    <div className="space-y-3">
                      {newsFlashData.map((newsItem, index) => {
                        const colors = ['border-primary', 'border-accent', 'border-secondary']
                        const colorClass = colors[index % colors.length]
                        
                        return (
                          <div key={newsItem._id || index} className={`border-l-4 ${colorClass} pl-4`}>
                            {newsItem.link ? (
                              <a
                                href={newsItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:bg-muted/50 rounded p-2 -m-2 transition-colors cursor-pointer"
                                title="Click to open link"
                              >
                                <p className="text-sm font-medium hover:underline">{newsItem.text}</p>
                                <p className="text-xs text-muted-foreground">Latest update</p>
                              </a>
                            ) : (
                              <div>
                                <p className="text-sm font-medium">{newsItem.text}</p>
                                <p className="text-xs text-muted-foreground">Latest update</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No news updates available</p>
                    </div>
                  )}
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
                  {loadingGallery ? (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-muted animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : galleryData.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 mb-4">
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
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href="/gallery">View All Photos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Achievements */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="govt-title text-3xl mb-4">{t("our.achievements")}</h2>
            <p className="govt-subtitle text-muted-foreground max-w-2xl mx-auto">
              {t("our.achievements.subtitle")}
            </p>
          </div>
          <AchievementsCarousel achievements={achievementsData} loading={loadingAchievements} />
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
