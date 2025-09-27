"use client"

import { useEffect } from "react"

export function useVisitorTracking() {
  useEffect(() => {
    // Track visitor when component mounts
    const trackVisitor = async () => {
      try {
        await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        // Silently fail - visitor tracking shouldn't break the page
        console.log('Visitor tracking failed:', error)
      }
    }

    trackVisitor()
  }, [])
}

export default useVisitorTracking