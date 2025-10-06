"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Type, Contrast, ChevronDown, FileText, AlertCircle, Users, Volume2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/components/language-provider"
import { ImportantLinksDropdown } from "@/components/important-links-dropdown"
import { PublicInformationDropdown } from "@/components/public-information-dropdown"
import { ScreenReaderControls } from "@/components/screen-reader-controls"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [highContrast, setHighContrast] = useState(false)
  const { language, setLanguage, t } = useTranslation()
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Departments removed as per new requirements

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
      const newSize = prev === "small" ? "medium" : prev === "medium" ? "large" : "small"
      
      // Apply font size to the entire document
      const htmlElement = document.documentElement
      htmlElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large')
      htmlElement.classList.add(`font-size-${newSize}`)
      
      // Store preference in localStorage
      localStorage.setItem('fontSize', newSize)
      
      return newSize
    })
  }

  // Load saved preferences on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as "small" | "medium" | "large" | null
    const savedHighContrast = localStorage.getItem('highContrast') === 'true'
    
    if (savedFontSize) {
      setFontSize(savedFontSize)
      document.documentElement.classList.add(`font-size-${savedFontSize}`)
    } else {
      document.documentElement.classList.add('font-size-medium')
    }
    
    if (savedHighContrast) {
      setHighContrast(true)
      document.documentElement.classList.add('high-contrast')
    }
  }, [])

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const newHighContrast = !prev
      document.documentElement.classList.toggle("high-contrast", newHighContrast)
      localStorage.setItem('highContrast', newHighContrast.toString())
      return newHighContrast
    })
  }

  return (
    <>
      {/* Top Government Header - Higher contrast (Non-sticky) */}
      <div className="bg-slate-800 dark:bg-slate-900 text-white py-2">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleFontSize}
                  className="text-white hover:bg-white/10"
                  aria-label={`Font size: ${fontSize}`}
                >
                  <Type className="h-4 w-4" />
                </Button>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleHighContrast}
                  className="text-white hover:bg-white/20"
                  aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
                >
                  <Contrast className="h-4 w-4" />
                </Button> */}
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-white hover:bg-white/10"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language === "en" ? "हिंदी" : "English"}
                </Button>
                <ScreenReaderControls />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Header - Adaptive Background (Non-sticky) */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-6">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Side - CBIC Logo */}
            <div className="flex items-center gap-6">
              <img 
                src="/logo.png" 
                alt="Central Board of Indirect Taxes & Customs Logo" 
                className="h-36 w-36 object-contain flex-shrink-0"
              />
              <div>
                <h1 className="text-3xl font-black text-primary dark:text-cyan-200 dark:drop-shadow-lg mb-2">
                  PUNE CUSTOMS
                </h1>
                <div className="h-1 w-20 bg-accent dark:bg-cyan-300 mb-2"></div>
                <p className="text-primary dark:text-cyan-100 font-semibold">
                  Central Board of Indirect Taxes & Customs
                </p>
                <p className="text-sm text-gray-600 dark:text-cyan-50 font-medium">
                  Department of Revenue, Ministry of Finance, Government of India
                </p>
              </div>
            </div>

            {/* Right Side - Search and Emblem with Leaders */}
            <div className="flex items-center gap-6">
              {/* Search Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const query = formData.get('search') as string
                  if (query?.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                  }
                }}
                className="flex items-center gap-2"
              >
                <input
                  name="search"
                  type="text"
                  placeholder="Search website..."
                  className="px-3 py-2 text-sm text-slate-900 bg-white rounded border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent shadow-sm"
                />
                <Button type="submit" size="sm" className="bg-accent hover:bg-primary text-white px-4">
                  Search
                </Button>
              </form>
              
              <div className="flex items-center gap-4">
                <img 
                  src="/sli_1.jpg" 
                  alt="Official Portrait" 
                  className="h-24 w-24 object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700"
                />
                <img 
                  src="/NSFM.png" 
                  alt="NSFM Official Portrait" 
                  className="h-24 w-24 object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700"
                />
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/Emblem_of_India_with_transparent_background.png" 
                  alt="Indian National Emblem" 
                  className="h-20 w-20 object-contain"
                />
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">सत्यमेव जयते</p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Central Board of Indirect Taxes & Customs Logo" 
                className="h-28 w-28 object-contain"
              />
              <img 
                src="/Emblem_of_India_with_transparent_background.png" 
                alt="Indian National Emblem" 
                className="h-20 w-20 object-contain"
              />
            </div>
            
            {/* Official Images for Mobile */}
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <img 
                  src="/sli_1.jpg" 
                  alt="Official Portrait" 
                  className="h-20 w-20 object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700"
                />
              </div>
              <div className="flex items-center">
                <img 
                  src="/NSFM.png" 
                  alt="NSFM Official Portrait" 
                  className="h-20 w-20 object-cover rounded-full shadow-lg border-4 border-white dark:border-slate-700"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-xl font-black text-primary dark:text-cyan-200 dark:drop-shadow-lg mb-2">
                PUNE CUSTOMS COMMISSIONERATE
              </h1>
              <div className="h-1 w-16 bg-accent dark:bg-cyan-300 mx-auto mb-2"></div>
              <p className="text-primary dark:text-cyan-100 font-semibold text-sm">
                Central Board of Indirect Taxes & Customs
              </p>
              <p className="text-xs text-gray-600 dark:text-cyan-50 font-medium">
                Department of Revenue, Ministry of Finance, Government of India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header - Darker for better visibility */}
      <header
        className={`sticky top-0 z-50 w-full border-b-2 border-slate-700 dark:border-slate-600 bg-slate-900 text-white shadow-xl ${highContrast ? "contrast-more" : ""}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center relative gap-4">
            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("nav.home")}
              </Link>
              
              {/* About Us */}
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/about") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("nav.about")}
              </Link>
              
              {/* Important Links - 3rd position */}
              <ImportantLinksDropdown />
              
              {/* Other Dropdowns - 4th position */}
              <PublicInformationDropdown />
              
              {/* Rest of navigation items */}
              <Link
                href="/gallery"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/gallery") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/services"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/services") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/faqs"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/faqs") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("nav.faqs")}
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium hover:shadow-sm ${
                  isActive("/contact") 
                    ? "bg-white/10 text-white shadow-md" 
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Right utilities: Mobile Menu only (search moved to top bar) */}
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
                  {/* Mobile Search */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      const query = formData.get('search') as string
                      if (query?.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      name="search"
                      type="text"
                      placeholder="Search website..."
                      className="px-3 py-2 text-sm text-foreground bg-background rounded border border-border w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                    <Button type="submit" size="sm" className="bg-accent hover:bg-primary text-white px-4">
                      Search
                    </Button>
                  </form>
                  {/* Home */}
                  <Link
                    href="/"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                  
                  {/* About Us */}
                  <Link
                    href="/about"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/about") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
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
                  
                  {/* Departments removed */}
                  
                  {/* Rest of navigation items */}
                  <Link
                    href="/gallery"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/gallery") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/services"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/services") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.services")}
                  </Link>
                  <Link
                    href="/faqs"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/faqs") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.faqs")}
                  </Link>
                  <Link
                    href="/contact"
                    className={`transition-colors font-medium py-2 px-3 rounded-md ${
                      isActive("/contact") 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
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
