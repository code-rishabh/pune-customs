"use client"

import { useEffect, useRef } from "react"
import { useScreenReader } from "@/contexts/screen-reader-context"

interface UseHoverReaderOptions {
  enabled?: boolean
  delay?: number
  selector?: string
  excludeSelectors?: string[]
}

export function useHoverReader(options: UseHoverReaderOptions = {}) {
  const {
    enabled = true,
    delay = 500,
    selector = '*',
    excludeSelectors = ['script', 'style', 'noscript', '.sr-only', '[aria-hidden="true"]']
  } = options

  const { isEnabled, readText, stopReading } = useScreenReader()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastReadTextRef = useRef<string>("")

  useEffect(() => {
    if (!enabled || !isEnabled) return

    const getTextContent = (element: Element): string => {
      // Skip excluded selectors
      if (excludeSelectors.some(sel => element.matches(sel))) {
        return ""
      }

      // Get aria-label first (best for accessibility)
      const ariaLabel = element.getAttribute('aria-label')
      if (ariaLabel?.trim()) return ariaLabel.trim()

      // Get title attribute
      const title = element.getAttribute('title')
      if (title?.trim()) return title.trim()

      // Get alt text for images
      if (element.tagName === 'IMG') {
        const alt = (element as HTMLImageElement).alt
        if (alt?.trim()) return alt.trim()
      }

      // Get button or link text
      if (element.tagName === 'BUTTON' || element.tagName === 'A') {
        const text = element.textContent?.trim()
        if (text) return text
      }

      // Get input placeholder or label
      if (element.tagName === 'INPUT') {
        const input = element as HTMLInputElement
        const placeholder = input.placeholder?.trim()
        const associatedLabel = input.labels?.[0]?.textContent?.trim()
        return associatedLabel || placeholder || input.value?.trim() || ""
      }

      // Get form control labels
      if (element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
        const id = element.id
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`)?.textContent?.trim()
          if (label) return label
        }
      }

      // Get text content for text elements
      const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'TD', 'TH', 'LI']
      if (textElements.includes(element.tagName)) {
        // Get only direct text, not from child elements to avoid duplication
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.parentElement === element ? 
                NodeFilter.FILTER_ACCEPT : 
                NodeFilter.FILTER_REJECT
            }
          }
        )
        
        let text = ""
        let node
        while (node = walker.nextNode()) {
          text += node.textContent || ""
        }
        
        return text.trim()
      }

      return ""
    }

    const handleMouseEnter = (event: Event) => {
      const target = event.target as Element
      if (!target) return

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      // Set a delay before reading
      timeoutRef.current = setTimeout(() => {
        const text = getTextContent(target)
        
        // Only read if we have text and it's different from the last read text
        if (text && text !== lastReadTextRef.current) {
          lastReadTextRef.current = text
          readText(text)
        }
      }, delay)
    }

    const handleMouseLeave = () => {
      // Clear timeout when mouse leaves
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    // Add event listeners to all elements
    const elements = document.querySelectorAll(selector)
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [enabled, isEnabled, delay, selector, excludeSelectors, readText])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
}