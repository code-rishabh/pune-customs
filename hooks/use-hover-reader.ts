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
    delay = 300,
    selector = '*', // Listen to all elements
    excludeSelectors = ['script', 'style', 'noscript', '.sr-only', '[aria-hidden="true"]', 'html', 'body', 'head']
  } = options

  const { isEnabled, readText } = useScreenReader()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastReadTextRef = useRef<string>("")

  useEffect(() => {
    if (!enabled || !isEnabled) return

    const getTextContent = (element: Element): string => {
      // Skip excluded selectors
      if (excludeSelectors.some(sel => {
        try {
          return element.matches(sel)
        } catch {
          return false
        }
      })) {
        return ""
      }

      // Skip elements that are hidden
      if (element instanceof HTMLElement) {
        const style = window.getComputedStyle(element)
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          return ""
        }
      }

      // Priority 1: aria-label (best for accessibility)
      const ariaLabel = element.getAttribute('aria-label')
      if (ariaLabel?.trim()) return ariaLabel.trim()

      // Priority 2: aria-describedby
      const ariaDescribedBy = element.getAttribute('aria-describedby')
      if (ariaDescribedBy) {
        const describedElement = document.getElementById(ariaDescribedBy)
        if (describedElement?.textContent?.trim()) {
          return describedElement.textContent.trim()
        }
      }

      // Priority 3: title attribute
      const title = element.getAttribute('title')
      if (title?.trim()) return title.trim()

      // Priority 4: alt text for images
      if (element.tagName === 'IMG') {
        const alt = (element as HTMLImageElement).alt
        if (alt?.trim()) return alt.trim()
        return "Image"
      }

      // Priority 5: value for input elements
      if (element.tagName === 'INPUT') {
        const input = element as HTMLInputElement
        const placeholder = input.placeholder?.trim()
        const value = input.value?.trim()
        const associatedLabel = input.labels?.[0]?.textContent?.trim()
        
        // For different input types
        if (input.type === 'submit' || input.type === 'button') {
          return value || placeholder || associatedLabel || "Button"
        }
        if (input.type === 'checkbox' || input.type === 'radio') {
          const status = input.checked ? "checked" : "unchecked"
          return `${associatedLabel || placeholder || "Option"} ${status}`
        }
        
        return associatedLabel || placeholder || (value ? `Input: ${value}` : "Input field")
      }

      // Priority 6: labels for form controls
      if (['SELECT', 'TEXTAREA'].includes(element.tagName)) {
        const id = element.id
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`)?.textContent?.trim()
          if (label) return label
        }
        
        if (element.tagName === 'SELECT') {
          const selectedOption = (element as HTMLSelectElement).selectedOptions[0]
          const optionText = selectedOption?.textContent?.trim()
          return optionText ? `Dropdown: ${optionText}` : "Dropdown"
        }
        
        if (element.tagName === 'TEXTAREA') {
          const value = (element as HTMLTextAreaElement).value?.trim()
          return value ? `Text area: ${value}` : "Text area"
        }
      }

      // Priority 7: button text
      if (element.tagName === 'BUTTON') {
        const text = element.textContent?.trim()
        return text || "Button"
      }

      // Priority 8: link text
      if (element.tagName === 'A') {
        const text = element.textContent?.trim()
        const href = (element as HTMLAnchorElement).href
        if (text) {
          return href && href !== window.location.href ? `${text} Link` : text
        }
        return "Link"
      }

      // Priority 9: text content for various elements
      const textElements = [
        'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'TD', 'TH', 'LI', 'LABEL',
        'EM', 'STRONG', 'B', 'I', 'U', 'MARK', 'SMALL', 'SUB', 'SUP', 'CODE', 'KBD', 'VAR',
        'BLOCKQUOTE', 'CITE', 'Q', 'TIME', 'ADDRESS', 'ARTICLE', 'SECTION', 'ASIDE', 'MAIN',
        'HEADER', 'FOOTER', 'NAV', 'FIGURE', 'FIGCAPTION', 'DETAILS', 'SUMMARY'
      ]

      if (textElements.includes(element.tagName)) {
        const text = element.textContent?.trim()
        if (text && text.length > 0) {
          // Avoid reading very long text blocks in full
          if (text.length > 200) {
            return text.substring(0, 200) + "... continues"
          }
          return text
        }
      }

      // Priority 10: any element with meaningful text content
      const text = element.textContent?.trim()
      if (text && text.length > 0 && text.length < 500) {
        // Skip if it's just whitespace or single characters
        if (text.length > 2 && !/^\s*$/.test(text)) {
          return text
        }
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

    // Add event listeners to document for all elements
    document.addEventListener('mouseover', handleMouseEnter, true)
    document.addEventListener('mouseout', handleMouseLeave, true)

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      document.removeEventListener('mouseover', handleMouseEnter, true)
      document.removeEventListener('mouseout', handleMouseLeave, true)
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