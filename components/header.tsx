"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Search, Type, Contrast } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [highContrast, setHighContrast] = useState(false)
  const { language, setLanguage, t } = useTranslation()

  const navigationItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/notices", label: t("nav.notices") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/services", label: t("nav.services") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/feedback", label: t("nav.feedback") },
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
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : ""} ${highContrast ? "contrast-more" : ""}`}
    >
      {/* Government Header */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>{t("government.header")}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Accessibility Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleFontSize}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label={`Font size: ${fontSize}`}
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleHighContrast}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
            >
              <Contrast className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label={`Switch to ${language === "en" ? "Hindi" : "English"}`}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "en" ? t("switch.to.hindi") : t("switch.to.english")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">PC</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary font-serif">{t("pune.customs")}</h1>
              <p className="text-sm text-muted-foreground">{t("customs.office")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              <Search className="h-4 w-4 mr-2" />
              {t("nav.search")}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
