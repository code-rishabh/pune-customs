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
        { label: "Acts", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Rules", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Regulation", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Forms", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Notification", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Circulars", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Instructions / Guidelines", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Orders", href: "https://taxinformation.cbic.gov.in/", external: true },
        { label: "Allied Acts", href: "https://taxinformation.cbic.gov.in/", external: true },
      ]
    },
    {
      title: "Online Services",
      links: [
        { label: "ICEGATE", href: "https://www.icegate.gov.in/", external: true },
        { label: "ECCS", href: "https://courier.cbic.gov.in/", external: true },
        { label: "Verify CBIC DIN", href: "https://esanchar.cbic.gov.in/DIN/DINSearch", external: true },
        { label: "Compliance Information Portal", href: "https://cip.icegate.gov.in/CIP/#/home", external: true },
        { label: "Customs Duty Calculator", href: "https://www.old.icegate.gov.in/Webappl/", external: true },
        { label: "Exchange Rate", href: "https://foservices.icegate.gov.in/#/services/viewExchangeRate", external: true },
      ]
    },
    {
      title: "Tariff, Drawback Schedule",
      links: [
        { label: "Tariff", href: "https://www.cbic.gov.in/entities/cbic-content-mst/Njk%3D", external: true },
        { label: "Drawback Schedule", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzA%3D", external: true },
      ]
    },
    {
      title: "Manuals & FAQs",
      links: [
        { label: "Manuals", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzE%3D", external: true },
        { label: "CRCL Brochure", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzI%3D", external: true },
        { label: "E-Brochures", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTQ1NTE%3D", external: true },
        { label: "E-Brochures Hindi", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTYxMTY%3D", external: true },
        { label: "FAQs", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTUwMDA%3D", external: true },
        { label: "Handy Updates", href: "https://www.cbic.gov.in/entities/citizen-corner", external: true },
        { label: "Ease Of Doing Business (EODB) - Customs", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTY2OTIy", external: true },
        { label: "SCOMET clarifications", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTcxMTI3", external: true },
      ]
    },
    {
      title: "Case Laws",
      links: [
        { label: "Valuation", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTQ4", external: true },
        { label: "Exemption", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTQ5", external: true },
        { label: "Classification", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTUw", external: true },
        { label: "Refund/ Rebate", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTUx", external: true },
        { label: "Pre-deposit", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTUy", external: true },
        { label: "Penalty/ Interest", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTUz", external: true },
        { label: "Provisional Assessment", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU0", external: true },
        { label: "Fraud & Collusion", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU1", external: true },
        { label: "Unjust Enrichment", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU2", external: true },
        { label: "License", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU3", external: true },
        { label: "Confiscation", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU4", external: true },
        { label: "Seizure", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTU5", external: true },
        { label: "Condonation of Delay", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTYw", external: true },
        { label: "General", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTYx", external: true },
        { label: "Jurisdictions", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTYy", external: true },
      ]
    },
    {
      title: "Others",
      links: [
        { label: "Indian AEO Programme", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzQ%3D", external: true },
        { label: "Nominated Bank for Payment of Duty", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTA1", external: true },
        { label: "ICD/CFS", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTY3MDQ5", external: true },
        { label: "SEZ", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzY%3D", external: true },
        { label: "IPR", href: "https://www.cbic.gov.in/entities/cbic-content-mst/OTQ%3D", external: true },
        { label: "CAAR (Advance Rulings)", href: "https://www.cbic.gov.in/entities/cbic-content-mst/NzU%3D", external: true },
        { label: "Manufacturing in Customs Bonded Facility", href: "https://www.investindia.gov.in/bonded-manufacturing", external: true },
        { label: "Manual/ Draft Manual", href: "https://www.cbic.gov.in/entities/cbic-content-mst/MTQ2MDk%3D", external: true },
        { label: "Taxpayers & Stakeholders", href: "https://www.cbic.gov.in/entities/taxPayerAssistance", external: true },
        { label: "International Travellers", href: "https://www.cbic.gov.in/entities/internationalTravellers", external: true },
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
          "flex items-center gap-1 text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium",
          className
        )}
      >
        Important Links
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div
        ref={dropdownRef}
        className={cn(
          "absolute top-full -left-32 mt-2 w-[90vw] max-w-[1200px] bg-background border border-border rounded-lg shadow-2xl z-50 transition-all duration-200 ease-in-out",
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
                <h3 className="font-bold text-primary text-sm border-b border-primary/20 pb-1 mb-1">
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
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                        >
                          {link.label}
                          <ExternalLink className="h-2 w-2 flex-shrink-0" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
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
