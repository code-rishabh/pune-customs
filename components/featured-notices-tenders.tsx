"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { News } from "@/lib/news"

interface Notice {
  _id: string
  heading: string
  subheading: string
  publishedDate: string
  validUntil: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface Tender {
  _id: string
  heading: string
  description: string
  publishedDate: string
  lastDate: string
  openingDate: string
  estimatedValue: number
  tenderNo: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface FeaturedData {
  notices: Notice[]
  tenders: Tender[]
  news: any[]
}

type FeaturedNoticesTendersProps = {
  latestUpdates?: News[]
}

export function FeaturedNoticesTenders({ latestUpdates }: FeaturedNoticesTendersProps) {
  const [featuredData, setFeaturedData] = useState<FeaturedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/featured?noticeLimit=3&tenderLimit=3')
        const data = await response.json()
        
        if (data.success) {
          setFeaturedData(data.data)
        }
      } catch (error) {
        console.error('Error fetching featured data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedData()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR' 
    }).format(value)
  }

  

  const hasContent = featuredData && (featuredData.notices.length > 0 || featuredData.tenders.length > 0)

  return (
    <section className="py-2 ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Latest Notices & Tenders
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with featured notices and tender opportunities
            </p>
          </div> */}

          {!hasContent ? (
            <div className="text-center py-8 text-muted-foreground">
              No featured notices or tenders available at the moment.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* Featured Notices */}
              {featuredData.notices.length > 0 && (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-serif font-bold">Featured Notices</h3>
                  </div>
                  <div className="space-y-4">
                    {featuredData.notices.map((notice) => (
                      <Card key={notice._id} className="hover:shadow-md transition-shadow min-h-[200px]">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default">Notice</Badge>
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Featured
                                </Badge>
                              </div>
                              <CardTitle className="text-lg leading-tight mb-2">
                                {notice.heading}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {notice.subheading}
                              </CardDescription>
                            </div>
                            {notice.documentUrl && (
                              <Button asChild size="sm" className="flex-shrink-0">
                                <a href={notice.documentUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Published: {new Date(notice.publishedDate).toLocaleDateString("en-IN")}
                            </div>
                            <div>
                              Valid Until: {new Date(notice.validUntil).toLocaleDateString("en-IN")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button asChild variant="outline">
                      <Link href="/notices?tab=notices">View All Notices</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Featured Tenders */}
              {featuredData.tenders.length > 0 && (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <AlertCircle className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-serif font-bold">Featured Tenders</h3>
                  </div>
                  <div className="space-y-4">
                    {featuredData.tenders.map((tender) => (
                      <Card key={tender._id} className="hover:shadow-md transition-shadow min-h-[200px]">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default">Tender</Badge>
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Featured
                                </Badge>
                              </div>
                              <CardTitle className="text-lg leading-tight mb-2">
                                {tender.heading}
                              </CardTitle>
                              <div className="text-sm text-muted-foreground mb-2">
                                <strong>Tender No:</strong> {tender.tenderNo}
                              </div>
                              {/* Estimated Value removed as per new requirement */}
                            </div>
                            {tender.documentUrl && (
                              <Button asChild size="sm" className="flex-shrink-0">
                                <a href={tender.documentUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Published: {new Date(tender.publishedDate).toLocaleDateString("en-IN")}
                            </div>
                            <div className="text-destructive font-medium">
                              Last Date: {new Date(tender.lastDate).toLocaleDateString("en-IN")}
                            </div>
                            <div>
                              Opening: {new Date(tender.openingDate).toLocaleDateString("en-IN")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button asChild variant="outline">
                      <Link href="/notices?tab=tenders">View All Tenders</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Latest Updates (optional third column) */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-serif font-bold">Latest Updates</h3>
                </div>
                <Card className="min-h-[200px]">
                  <CardContent className="space-y-4 pt-6">
                    {Array.isArray(latestUpdates) && latestUpdates.length > 0 ? (
                      <div className="space-y-3">
                        {latestUpdates.map((newsItem, index) => {
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}