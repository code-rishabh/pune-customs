"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LinkGroup {
  title: string
  links: {
    label: string
    href: string
    external?: boolean
  }[]
}

interface ImportantLinksDropdownProps {
  className?: string
}

export function ImportantLinksDropdown({ className }: ImportantLinksDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle hover with delay
  const handleMouseEnter = () => {
    console.log("Mouse entered dropdown")
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsHovering(true)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    console.log("Mouse left dropdown")
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

  const linkGroups: LinkGroup[] = [
    {
      title: "Tax Legislation",
      links: [
        { label: "Acts", href: "/acts" },
        { label: "Rules", href: "/rules" },
        { label: "Regulation", href: "/regulations" },
        { label: "Forms", href: "/forms" },
        { label: "Notification", href: "/notifications" },
        { label: "Circulars", href: "/circulars" },
        { label: "Instructions / Guidelines", href: "/guidelines" },
        { label: "Orders", href: "/orders" },
        { label: "Allied Acts", href: "/allied-acts" },
      ]
    },
    {
      title: "Online Services",
      links: [
        { label: "ICEGATE", href: "https://www.icegate.gov.in", external: true },
        { label: "ECCS", href: "https://eccs.gov.in", external: true },
        { label: "Verify CBIC DIN", href: "/verify-din" },
        { label: "Compliance Information Portal", href: "/compliance-portal" },
        { label: "Customs Duty Calculator", href: "/calculator" },
        { label: "Exchange Rate", href: "/exchange-rate" },
      ]
    },
    {
      title: "Tariff, Drawback Schedule",
      links: [
        { label: "Tariff", href: "/tariff" },
        { label: "Drawback Schedule", href: "/drawback-schedule" },
      ]
    },
    {
      title: "Manuals & FAQs",
      links: [
        { label: "Manuals", href: "/manuals" },
        { label: "CRCL Brochure", href: "/crcl-brochure" },
        { label: "E-Brochures", href: "/e-brochures" },
        { label: "E-Brochures Hindi", href: "/e-brochures-hindi" },
        { label: "FAQs", href: "/faqs" },
        { label: "Handy Updates", href: "/handy-updates" },
        { label: "Ease Of Doing Business (EODB) - Customs", href: "/eodb" },
        { label: "SCOMET clarifications", href: "/scomet" },
      ]
    },
    {
      title: "Case Laws",
      links: [
        { label: "Valuation", href: "/case-laws/valuation" },
        { label: "Exemption", href: "/case-laws/exemption" },
        { label: "Classification", href: "/case-laws/classification" },
        { label: "Refund/ Rebate", href: "/case-laws/refund" },
        { label: "Pre-deposit", href: "/case-laws/pre-deposit" },
        { label: "Penalty/ Interest", href: "/case-laws/penalty" },
        { label: "Provisional Assessment", href: "/case-laws/provisional" },
        { label: "Fraud & Collusion", href: "/case-laws/fraud" },
        { label: "Unjust Enrichment", href: "/case-laws/unjust-enrichment" },
      ]
    },
    {
      title: "Others",
      links: [
        { label: "Indian AEO Programme", href: "/aeo-programme" },
        { label: "Nominated Bank for Payment of Duty", href: "/nominated-banks" },
        { label: "ICD/CFS", href: "/icd-cfs" },
        { label: "SEZ", href: "/sez" },
        { label: "IPR", href: "/ipr" },
        { label: "CAAR (Advance Rulings)", href: "/caar" },
        { label: "Manufacturing in Customs Bonded Facility", href: "/bonded-facility" },
      ]
    }
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium",
          className
        )}
      >
        Important Links
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div
        ref={dropdownRef}
        className={cn(
          "absolute top-full right-0 mt-2 w-[85vw] max-w-[1200px] bg-white border border-gray-200 rounded-lg shadow-2xl z-50 transition-all duration-200 ease-in-out",
          isOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {linkGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-1">
                <h3 className="font-bold text-green-600 text-xs border-b border-green-200 pb-1 mb-1">
                  {group.title}
                </h3>
                <ul className="space-y-0.5">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-gray-600 hover:text-green-600 transition-colors py-0.5"
                        >
                          {link.label}
                          <ExternalLink className="h-2 w-2 flex-shrink-0" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block text-xs text-gray-600 hover:text-green-600 transition-colors py-0.5"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
