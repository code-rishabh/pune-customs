"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getNewsItemsClient } from "@/lib/news"

type NewsFlashProps = {
  items?: string[]
  speedSeconds?: number
}

const defaultItems = [
  // "Online application system now available for all services",
  // "Updated tariff rates published for Q1 2024",
  "Digital signature facility launched for importers",
  "Extended working hours during festival season",
  // "New AEO certification process simplified",
]

export function NewsFlash({ items = defaultItems, speedSeconds = 40 }: NewsFlashProps) {
  const [fetchedItems, setFetchedItems] = useState<string[] | null>(null)

  useEffect(() => {
    let isMounted = true
    getNewsItemsClient().then((data) => {
      if (!isMounted) return
      if (Array.isArray(data) && data.length > 0) {
        setFetchedItems(data)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const trackItems = useMemo(() => {
    const src = fetchedItems && fetchedItems.length > 0 ? fetchedItems : items
    return src.length ? src : defaultItems
  }, [fetchedItems, items])

  return (
    <section className="bg-accent text-accent-foreground py-3 border-b">
      <div className="container mx-auto px-4">
        <div className="group flex items-center gap-4">
          <Badge variant="secondary" className="flex-shrink-0 bg-primary text-primary-foreground">
            <Bell className="mr-1 h-3 w-3" />
            News Flash
          </Badge>

          <div className="relative flex-1 overflow-hidden" aria-live="polite">
            <div
              className="marquee flex items-center whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              style={{
                // duration in seconds for a full loop
                // duplicated content ensures a seamless loop
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore – CSS var for styled-jsx
                "--duration": `${Math.max(10, speedSeconds)}s`,
              }}
            >
              <div className="flex items-center gap-8 pr-8">
                {trackItems.map((item, idx) => (
                  <span key={`a-${idx}`} className="text-sm font-medium inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-8 pr-8" aria-hidden="true">
                {trackItems.map((item, idx) => (
                  <span key={`b-${idx}`} className="text-sm font-medium inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link href="/notices" className="flex items-center gap-1 text-sm hover:underline flex-shrink-0">
            View All <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
      <style jsx>{`
        .marquee {
          display: inline-flex;
          gap: 2rem;
          padding-left: 0.5rem;
          animation: marquee var(--duration, 20s) linear infinite;
        }
        .group:hover .marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none !important;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
