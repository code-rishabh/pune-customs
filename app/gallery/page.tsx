"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Camera, Video, FileText, Download, Eye } from "lucide-react"
import Image from "next/image"
import { getMediaByType, MediaItem } from "@/lib/news"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Data state
  const [photos, setPhotos] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<MediaItem[]>([])
  const [documents, setDocuments] = useState<MediaItem[]>([])
  const [pressReleases, setPressReleases] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all media data
  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        setLoading(true)
        const [photosData, videosData, documentsData, pressData] = await Promise.all([
          getMediaByType('photo'),
          getMediaByType('video'),
          getMediaByType('document'),
          getMediaByType('press')
        ])
        
        setPhotos(photosData)
        setVideos(videosData)
        setDocuments(documentsData)
        setPressReleases(pressData)
      } catch (error) {
        console.error("Error fetching media data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMedia()
  }, [])


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
                {loading ? (
                  <div className="text-center py-8">Loading photos...</div>
                ) : photos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No photos available.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                      <Card key={photo._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={photo.link || "/placeholder.svg"}
                            alt={photo.heading}
                            fill
                            className="object-cover"
                            onClick={() => setSelectedImage(photo.link)}
                          />
                          {photo.category && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">{photo.category}</Badge>
                            </div>
                          )}
                          {photo.featured && (
                            <div className="absolute top-2 left-2">
                              <Badge variant="default">Featured</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{photo.heading}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{photo.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(photo.date).toLocaleDateString("en-IN")}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos">
                {loading ? (
                  <div className="text-center py-8">Loading videos...</div>
                ) : videos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No videos available.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-video">
                          <Image
                            src={video.link || "/placeholder.svg"}
                            alt={video.heading}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Button size="lg" className="rounded-full">
                              <Video className="h-6 w-6" />
                            </Button>
                          </div>
                          {video.category && (
                            <div className="absolute bottom-2 right-2">
                              <Badge variant="secondary">{video.category}</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{video.heading}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(video.date).toLocaleDateString("en-IN")}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents">
                {loading ? (
                  <div className="text-center py-8">Loading documents...</div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No documents available.</div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <Card key={doc._id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              {doc.category && (
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{doc.category}</Badge>
                                  <Badge variant="secondary">PDF</Badge>
                                </div>
                              )}
                              <h3 className="font-semibold text-lg mb-2">{doc.heading}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(doc.date).toLocaleDateString("en-IN")}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href={doc.link} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </a>
                              </Button>
                              <Button size="sm" asChild>
                                <a href={doc.link} download>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Press Releases Tab */}
              <TabsContent value="press">
                {loading ? (
                  <div className="text-center py-8">Loading press releases...</div>
                ) : pressReleases.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No press releases available.</div>
                ) : (
                  <div className="space-y-6">
                    {pressReleases.map((press) => (
                      <Card key={press._id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-xl mb-2">{press.heading}</h3>
                              <p className="text-muted-foreground mb-4">{press.description}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(press.date).toLocaleDateString("en-IN")}
                              </div>
                            </div>
                            {press.link && (
                              <Button variant="outline" asChild>
                                <a href={press.link} target="_blank" rel="noopener noreferrer">
                                  Read More
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
