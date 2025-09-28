"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Achievement } from "@/lib/news"

interface AchievementsCarouselProps {
  achievements: Achievement[]
  loading?: boolean
}

// Demo achievements data using ONLY existing images from public folder
const demoAchievements: Achievement[] = [
  {
    _id: "demo-1",
    heading: "Annual Customs Day Celebration",
    description: "Successfully organized the Annual Customs Day celebration, bringing together stakeholders and showcasing our commitment to excellence in customs services.",
    imageUrl: "/government-celebration-ceremony.jpg",
    priority: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "demo-2", 
    heading: "Digital Infrastructure Excellence",
    description: "Implemented state-of-the-art digital infrastructure to streamline customs operations and enhance service delivery for all stakeholders.",
    imageUrl: "/uploads/digital-government-office-technology.jpg",
    priority: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "demo-3",
    heading: "Warehouse Inspection Drive",
    description: "Conducted comprehensive warehouse inspection drives to ensure compliance and maintain the highest standards of customs operations.",
    imageUrl: "/warehouse-inspection-government.jpg",
    priority: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "demo-4",
    heading: "Stakeholder Meeting Success",
    description: "Organized successful stakeholder meetings to foster better relationships and improve communication with trade partners and industry leaders.",
    imageUrl: "/uploads/government-workshop-meeting.jpg",
    priority: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "demo-5",
    heading: "Customs Office Operations",
    description: "Maintained efficient customs office operations with 24/7 service availability, ensuring seamless trade facilitation and customer satisfaction.",
    imageUrl: "/uploads/customs-office-operations.jpg",
    priority: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "demo-6",
    heading: "Digital Government Services",
    description: "Launched comprehensive digital government services platform, revolutionizing how citizens and businesses interact with customs authorities.",
    imageUrl: "/digital-government-services-video.jpg",
    priority: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export function AchievementsCarousel({ achievements, loading = false }: AchievementsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Always use demo data for now to test the carousel
  const displayAchievements = demoAchievements
  
  // Debug logging
  console.log('Achievements from props:', achievements)
  console.log('Display achievements:', displayAchievements)

  // Auto-play functionality - 3 seconds interval
  useEffect(() => {
    if (!isAutoPlaying || displayAchievements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayAchievements.length)
    }, 3000) // 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, displayAchievements.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayAchievements.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayAchievements.length) % displayAchievements.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }


  if (loading) {
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="aspect-[16/9] bg-muted rounded-2xl animate-pulse flex items-center justify-center">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading achievements...</p>
          </div>
        </div>
      </div>
    )
  }

  if (displayAchievements.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Achievements Yet</h3>
        <p className="text-muted-foreground">Check back later for our latest achievements and milestones.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayAchievements.map((achievement, index) => (
            <div key={achievement._id} className="w-full flex-shrink-0 relative">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={achievement.imageUrl || "/placeholder.jpg"}
                  alt={achievement.heading || "Achievement"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={(e) => {
                    console.log('Image failed to load:', achievement.imageUrl);
                    e.currentTarget.src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium mb-4">
                        <Star className="h-3 w-3" />
                        Achievement #{index + 1}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                        {achievement.heading || "Achievement"}
                      </h3>
                      <p className="text-sm lg:text-base text-white/90 mb-6 max-w-xl leading-relaxed">
                        {achievement.description || "Description not available"}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-white/80 font-medium text-sm">Pune Customs Excellence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {displayAchievements.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background shadow-xl border-2 hover:border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background shadow-xl border-2 hover:border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Bottom Controls - Only Dots */}
      {displayAchievements.length > 1 && (
        <div className="flex items-center justify-center mt-8">
          <div className="flex gap-2">
            {displayAchievements.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}