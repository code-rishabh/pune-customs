"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Camera, Video, FileText, Download, Eye } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const photos = [
    {
      id: 1,
      title: "Customs Clearance Operations",
      date: "2024-01-15",
      category: "Operations",
      description: "Daily customs clearance activities at Pune Customs Office",
      image: "/customs-office-operations.jpg",
    },
    {
      id: 2,
      title: "Anti-Smuggling Operation Success",
      date: "2024-01-10",
      category: "Enforcement",
      description: "Successful seizure of contraband goods at the border",
      image: "/customs-enforcement-operation.jpg",
    },
    {
      id: 3,
      title: "Trade Facilitation Workshop",
      date: "2024-01-08",
      category: "Events",
      description: "Workshop conducted for importers and exporters on new procedures",
      image: "/government-workshop-meeting.jpg",
    },
    {
      id: 4,
      title: "Digital India Initiative",
      date: "2024-01-05",
      category: "Technology",
      description: "Implementation of digital systems for faster processing",
      image: "/digital-government-office-technology.jpg",
    },
    {
      id: 5,
      title: "International Customs Day Celebration",
      date: "2024-01-26",
      category: "Events",
      description: "Annual celebration of International Customs Day with stakeholders",
      image: "/government-celebration-ceremony.jpg",
    },
    {
      id: 6,
      title: "Warehouse Inspection",
      date: "2024-01-03",
      category: "Operations",
      description: "Regular inspection of bonded warehouse facilities",
      image: "/warehouse-inspection-government.jpg",
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Pune Customs: Facilitating Trade",
      date: "2024-01-12",
      duration: "5:30",
      description: "Overview of services and facilities provided by Pune Customs",
      thumbnail: "/customs-office-video-thumbnail.jpg",
    },
    {
      id: 2,
      title: "How to Apply for Import License",
      date: "2024-01-08",
      duration: "8:45",
      description: "Step-by-step guide for applying for import licenses",
      thumbnail: "/government-tutorial-video-thumbnail.jpg",
    },
    {
      id: 3,
      title: "Digital Customs Procedures",
      date: "2024-01-05",
      duration: "12:15",
      description: "Introduction to online customs clearance procedures",
      thumbnail: "/digital-government-services-video.jpg",
    },
  ]

  const documents = [
    {
      id: 1,
      title: "Annual Report 2023-24",
      date: "2024-01-15",
      type: "Report",
      size: "2.5 MB",
      format: "PDF",
      description: "Comprehensive annual report covering all activities and achievements",
    },
    {
      id: 2,
      title: "Customs Procedures Manual",
      date: "2024-01-10",
      type: "Manual",
      size: "5.2 MB",
      format: "PDF",
      description: "Detailed manual for customs procedures and regulations",
    },
    {
      id: 3,
      title: "Trade Statistics Q4 2023",
      date: "2024-01-08",
      type: "Statistics",
      size: "1.8 MB",
      format: "PDF",
      description: "Quarterly trade statistics and analysis for the region",
    },
    {
      id: 4,
      title: "Stakeholder Feedback Report",
      date: "2024-01-05",
      type: "Report",
      size: "980 KB",
      format: "PDF",
      description: "Analysis of feedback received from importers and exporters",
    },
  ]

  const pressReleases = [
    {
      id: 1,
      title: "Pune Customs Achieves Record Revenue Collection",
      date: "2024-01-15",
      description: "Customs office surpasses annual revenue target by 15% in FY 2023-24",
    },
    {
      id: 2,
      title: "New Digital Platform Launched for Faster Clearances",
      date: "2024-01-12",
      description: "Revolutionary online system reduces processing time by 40%",
    },
    {
      id: 3,
      title: "Major Anti-Smuggling Operation Successful",
      date: "2024-01-10",
      description: "Contraband worth ₹50 lakhs seized in coordinated operation",
    },
    {
      id: 4,
      title: "Trade Facilitation Measures Show Positive Results",
      date: "2024-01-08",
      description: "New measures result in 25% increase in legitimate trade volume",
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
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Media Gallery</h1>
              <p className="text-xl text-muted-foreground">
                Explore our photo gallery, videos, documents, and press releases showcasing our work and achievements
              </p>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="photos" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="press" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Press
                </TabsTrigger>
              </TabsList>

              {/* Photos Tab */}
              <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          fill
                          className="object-cover"
                          onClick={() => setSelectedImage(photo.image)}
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">{photo.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{photo.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(photo.date).toLocaleDateString("en-IN")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button size="lg" className="rounded-full">
                            <Video className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="secondary">{video.duration}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(video.date).toLocaleDateString("en-IN")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents">
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{doc.type}</Badge>
                              <Badge variant="secondary">{doc.format}</Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(doc.date).toLocaleDateString("en-IN")}
                              </div>
                              <span>Size: {doc.size}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Press Releases Tab */}
              <TabsContent value="press">
                <div className="space-y-6">
                  {pressReleases.map((press) => (
                    <Card key={press.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl mb-2">{press.title}</h3>
                            <p className="text-muted-foreground mb-4">{press.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(press.date).toLocaleDateString("en-IN")}
                            </div>
                          </div>
                          <Button variant="outline">Read More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Gallery image"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
