"use client"

import { useEffect } from "react"
import { useHoverReader } from "@/hooks/use-hover-reader"
import { ScreenReaderControls } from "@/components/screen-reader-controls"

interface ScreenReaderProps {
  children: React.ReactNode
}

export function ScreenReader({ children }: ScreenReaderProps) {
  // Initialize hover reading functionality
  useHoverReader({
    enabled: true,
    delay: 300, // Reduced delay for better responsiveness
    selector: 'h1, h2, h3, h4, h5, h6, p, button, a, input, textarea, select, label, span, div[role="button"], [role="link"], [role="menuitem"]',
    excludeSelectors: [
      'script', 
      'style', 
      'noscript', 
      '.sr-only', 
      '[aria-hidden="true"]',
      '.screen-reader-ignore',
      'nav', // Avoid reading navigation containers
      'header', // Avoid reading header containers
      'footer', // Avoid reading footer containers
      '.breadcrumb' // Avoid reading breadcrumb containers
    ]
  })

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Load voices
      const loadVoices = () => {
        window.speechSynthesis.getVoices()
      }
      
      // Load voices immediately if available
      loadVoices()
      
      // Also load on voiceschanged event (for Chrome)
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      }
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}