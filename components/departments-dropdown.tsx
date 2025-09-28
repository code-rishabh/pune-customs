"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Department {
  href: string
  label: string
}

interface DepartmentsDropdownProps {
  className?: string
}

export function DepartmentsDropdown({ className }: DepartmentsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const departments: Department[] = [
    { href: "/departments/import", label: "Import Department" },
    { href: "/departments/export", label: "Export Department" },
    { href: "/departments/assessment", label: "Assessment Department" },
    { href: "/departments/enforcement", label: "Enforcement Department" },
    { href: "/departments/administration", label: "Administration Department" },
  ]

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsHovering(true)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) // 300ms delay before closing
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Departments
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-2">
            {departments.map((dept) => (
              <Link
                key={dept.href}
                href={dept.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
              >
                {dept.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
