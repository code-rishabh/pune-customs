"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Type, Contrast, ChevronDown, FileText, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { ImportantLinksDropdown } from "@/components/important-links-dropdown"
import { DepartmentsDropdown } from "@/components/departments-dropdown"
import { PublicInformationDropdown } from "@/components/public-information-dropdown"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [highContrast, setHighContrast] = useState(false)
  const { language, setLanguage, t } = useTranslation()

  const departments = [
    { href: "/departments/import", label: "Import Department" },
    { href: "/departments/export", label: "Export Department" },
    { href: "/departments/assessment", label: "Assessment Department" },
    { href: "/departments/enforcement", label: "Enforcement Department" },
    { href: "/departments/administration", label: "Administration Department" },
  ]

  const navigationItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/gallery", label: "Gallery" },
    { href: "/services", label: t("nav.services") },
    { href: "/faqs", label: t("nav.faqs") },
    { href: "/contact", label: t("nav.contact") },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  const cycleFontSize = () => {
    setFontSize((prev) => {
      if (prev === "small") return "medium"
      if (prev === "medium") return "large"
      return "small"
    })
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
    document.documentElement.classList.toggle("high-contrast")
  }

  return (
    <>
      {/* Top Government Header - Dark Blue (Non-sticky) */}
      <div className="bg-slate-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/Emblem_of_India_with_transparent_background.png" 
                alt="Indian National Emblem" 
                className="h-6 w-6 object-contain"
              />
              <span className="font-medium text-sm lg:text-base">Ministry of Finance, Department of Revenue, Government of India</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Search Keyword"
                  className="px-3 py-1 text-sm text-gray-800 rounded border-0 w-48"
                />
                <Button size="sm" className="bg-accent hover:bg-primary text-white px-4">
                  Search
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleFontSize}
                  className="text-white hover:bg-white/20"
                  aria-label={`Font size: ${fontSize}`}
                >
                  <Type className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleHighContrast}
                  className="text-white hover:bg-white/20"
                  aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
                >
                  <Contrast className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-white hover:bg-white/20"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language === "en" ? "हिंदी" : "English"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Header - White Background (Non-sticky) */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Side - CBIC Logo */}
            <div className="flex items-center gap-6">
              <img 
                src="/logo.png" 
                alt="Central Board of Indirect Taxes & Customs Logo" 
                className="h-24 w-24 object-contain flex-shrink-0"
              />
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  PUNE CUSTOMS
                </h1>
                <div className="h-1 w-20 bg-accent mb-2"></div>
                <p className="text-primary font-medium">
                  Central Board of Indirect Taxes & Customs
                </p>
                <p className="text-sm text-gray-600">
                  Department of Revenue, Ministry of Finance, Government of India
                </p>
              </div>
            </div>

            {/* Right Side - Indian National Emblem */}
            <div className="flex flex-col items-center">
              <img 
                src="/Emblem_of_India_with_transparent_background.png" 
                alt="Indian National Emblem" 
                className="h-20 w-20 object-contain"
              />
              <p className="text-xs text-gray-600 mt-2 font-medium">सत्यमेव जयते</p>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Central Board of Indirect Taxes & Customs Logo" 
                className="h-16 w-16 object-contain"
              />
              <img 
                src="/Emblem_of_India_with_transparent_background.png" 
                alt="Indian National Emblem" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-primary mb-2">
                PUNE CUSTOMS COMMISSIONERATE
              </h1>
              <div className="h-1 w-16 bg-accent mx-auto mb-2"></div>
              <p className="text-primary font-medium text-sm">
                Central Board of Indirect Taxes & Customs
              </p>
              <p className="text-xs text-gray-600">
                Department of Revenue, Ministry of Finance, Government of India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b-2 border-primary/30 bg-primary text-primary-foreground shadow-xl ${fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : ""} ${highContrast ? "contrast-more" : ""}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center relative">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Home */}
              <Link
                href="/"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                {t("nav.home")}
              </Link>
              
              {/* About Us */}
              <Link
                href="/about"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                {t("nav.about")}
              </Link>
              
              {/* Important Links - 3rd position */}
              <ImportantLinksDropdown />
              
              {/* Other Dropdowns - 4th, 5th positions */}
              <PublicInformationDropdown />
              <DepartmentsDropdown />
              
              {/* Rest of navigation items */}
              <Link
                href="/gallery"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                Gallery
              </Link>
              <Link
                href="/services"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/faqs"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                {t("nav.faqs")}
              </Link>
              <Link
                href="/contact"
                className="text-primary-foreground hover:text-white hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm"
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Mobile Menu */}
            <div className="absolute right-0 flex items-center gap-2">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 text-white">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Home */}
                  <Link
                    href="/"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                  
                  {/* About Us */}
                  <Link
                    href="/about"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.about")}
                  </Link>
                  
                  {/* Important Links Section - 3rd position */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-primary mb-3">Important Links</h3>
                    <div className="space-y-2">
                      <Link href="/acts" className="block text-sm text-muted-foreground hover:text-primary py-1" onClick={() => setIsMenuOpen(false)}>
                        Acts
                      </Link>
                      <Link href="/rules" className="block text-sm text-muted-foreground hover:text-primary py-1" onClick={() => setIsMenuOpen(false)}>
                        Rules
                      </Link>
                      <Link href="/forms" className="block text-sm text-muted-foreground hover:text-primary py-1" onClick={() => setIsMenuOpen(false)}>
                        Forms
                      </Link>
                      <Link href="/calculator" className="block text-sm text-muted-foreground hover:text-primary py-1" onClick={() => setIsMenuOpen(false)}>
                        Duty Calculator
                      </Link>
                      <a href="https://www.icegate.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary py-1">
                        ICEGATE
                      </a>
                    </div>
                  </div>
                  
                  {/* Public Information Section - 4th position */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-primary mb-3">Public Information</h3>
                    <div className="space-y-2">
                      <Link
                        href="/notices?tab=notices"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        Notices
                      </Link>
                      <Link
                        href="/notices?tab=tenders"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Tenders
                      </Link>
                      <Link
                        href="/notices?tab=recruitments"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Users className="h-4 w-4" />
                        Recruitments
                      </Link>
                    </div>
                  </div>
                  
                  {/* Departments Section - 5th position */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-primary mb-3">Departments</h3>
                    <div className="space-y-2">
                      {departments.map((dept) => (
                        <Link
                          key={dept.href}
                          href={dept.href}
                          className="block text-sm text-muted-foreground hover:text-primary py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dept.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rest of navigation items */}
                  <Link
                    href="/gallery"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/services"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.services")}
                  </Link>
                  <Link
                    href="/faqs"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.faqs")}
                  </Link>
                  <Link
                    href="/contact"
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
