"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react"
import { useTranslation } from "@/components/language-provider"
import { useEffect, useState } from "react"
import { getWebsiteUpdateInfo, formatUpdateTime, WebsiteUpdateInfo } from "@/lib/website-update"

export function Footer() {
  const { t } = useTranslation()
  const [visitors, setVisitors] = useState<number | null>(null)
  const [lastUpdate, setLastUpdate] = useState<WebsiteUpdateInfo | null>(null)

  useEffect(() => {
    // Track visitor and get count
    const trackAndGetVisitors = async () => {
      try {
        // Track the visit
        await fetch("/api/visitors", { method: "POST" })
        
        // Get visitor stats
        const response = await fetch("/api/visitors")
        if (response.ok) {
          const data = await response.json()
          setVisitors(data.data.totalVisitors)
        }
      } catch (error) {
        console.log("Visitor tracking failed:", error)
        setVisitors(null)
      }
    }

    trackAndGetVisitors()

    // fetch website update info
    getWebsiteUpdateInfo()
      .then((data) => setLastUpdate(data))
      .catch(() => setLastUpdate(null))
  }, [])

  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="govt-title text-lg mb-4">{t("contact.information")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <div>
                  <p>Pune Customs Office</p>
                  <p>Department of Revenue</p>
                  <p>Ministry of Finance</p>
                  <p>Government of India</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91-20-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@punecustoms.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon-Fri: 9:30 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="govt-title text-lg mb-4">{t("quick.links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/notices" className="hover:text-primary transition-colors">
                  Latest Notices
                </Link>
              </li>
              <li>
                <Link href="/tenders" className="hover:text-primary transition-colors">
                  Current Tenders
                </Link>
              </li>
              <li>
                <Link href="/forms" className="hover:text-primary transition-colors">
                  Download Forms
                </Link>
              </li>
              <li>
                <Link href="/procedures" className="hover:text-primary transition-colors">
                  Procedures
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="govt-title text-lg mb-4">{t("important.links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://www.cbic.gov.in/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  CBIC Official Website
                </Link>
              </li>
              <li>
                <Link href="https://www.dgft.gov.in/CP/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  DGFT Portal
                </Link>
              </li>
              <li>
                <Link href="https://www.icegate.gov.in/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  ICEGATE Portal
                </Link>
              </li>
              <li>
                <Link href="https://cblms.gov.in/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  CB LMS Portal
                </Link>
              </li>
              <li>
                <Link href="https://rtionline.gov.in/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  RTI Online Portal
                </Link>
              </li>
              <li>
                <Link href="https://pgportal.gov.in/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  Public Grievance Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="govt-title text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/PuneCustomsCommissionerate/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://x.com/punecustoms?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@punecustomsofficialchannel554/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="govt-title text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  {t("privacy.policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-primary transition-colors">
                  {t("terms.conditions")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 Pune Customs. {t("all.rights.reserved")}</p>
            <div className="flex items-center gap-4">
              <span>
                {t("website.updated")} {lastUpdate ? formatUpdateTime(lastUpdate.timestamp) : new Date().toLocaleDateString("en-IN")}
              </span>
              <span>|</span>
              <span>
                Visitors: {visitors ?? "-"}
              </span>
            </div>
          </div>
        </div>
        {/* Tricolor accent line */}
        <div className="tricolor-accent mt-8"></div>
      </div>
    </footer>
  )
}
