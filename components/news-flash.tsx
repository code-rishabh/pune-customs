"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bell, ExternalLink } from "lucide-react"
import Link from "next/link"

const newsItems = [
  "New customs clearance guidelines effective from January 2024",
  "Online application system now available for all services",
  "Updated tariff rates published for Q1 2024",
  "Digital signature facility launched for importers",
  "Extended working hours during festival season",
  "New AEO certification process simplified",
]

export function NewsFlash() {
  const [currentNews, setCurrentNews] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-accent text-accent-foreground py-3 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex-shrink-0 bg-primary text-primary-foreground">
            <Bell className="mr-1 h-3 w-3" />
            News Flash
          </Badge>
          <div className="flex-1 overflow-hidden">
            <div className="animate-pulse">
              <span className="text-sm font-medium">{newsItems[currentNews]}</span>
            </div>
          </div>
          <Link href="/notices" className="flex items-center gap-1 text-sm hover:underline flex-shrink-0">
            View All <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
