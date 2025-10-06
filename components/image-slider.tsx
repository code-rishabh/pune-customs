"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getSlidesClient } from "@/lib/slider"

type SlideData = {
  image: string
  title: string
  description: string
}

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<SlideData[]>([])

  useEffect(() => {
    // fetch dynamic slides
    console.log("ImageSlider: Fetching slides on mount")
    getSlidesClient().then((s) => {
      console.log("ImageSlider: Received slides:", s)
      if (Array.isArray(s) && s.length > 0) {
        setSlides(s)
        console.log("ImageSlider: Set slides to:", s)
      }
    })
  }, [])

  // Refresh slides every 30 seconds to pick up new additions
  useEffect(() => {
    const interval = setInterval(() => {
      getSlidesClient().then((s) => {
        if (Array.isArray(s) && s.length > 0) setSlides(s)
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-80 md:h-[400px] overflow-hidden rounded-lg bg-gray-100">
      {/* Debug button - remove in production */}
      {/* <button 
        onClick={() => {
          console.log("Manual refresh clicked")
          getSlidesClient().then((s) => {
            console.log("Manual refresh received:", s)
            if (Array.isArray(s) && s.length > 0) setSlides(s)
          })
        }}
        className="absolute top-2 right-2 z-10 bg-black/50 text-white px-2 py-1 text-xs rounded"
      >
        Refresh
      </button> */}
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-contain"
            priority={index === 0}
          />
          <div className="absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
            <p className="text-lg opacity-90">{slide.description}</p>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
