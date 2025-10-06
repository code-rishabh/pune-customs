"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const publicInfoItems = [
  { 
    href: "/notices?tab=notices", 
    label: "Notices"
  },
  { 
    href: "/notices?tab=tenders", 
    label: "Tenders"
  },
  { 
    href: "/notices?tab=recruitments", 
    label: "Recruitments"
  },
]

export function PublicInformationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) // 300ms delay before closing
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <button
        className="text-slate-200 hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Public Information
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-2">
            {publicInfoItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
