"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">{t("contact.information")}</h3>
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
            <h3 className="font-serif font-semibold text-lg mb-4">{t("quick.links")}</h3>
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
            <h3 className="font-serif font-semibold text-lg mb-4">{t("important.links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://www.cbic.gov.in" className="hover:text-primary transition-colors" target="_blank">
                  CBIC
                </Link>
              </li>
              <li>
                <Link href="https://www.india.gov.in" className="hover:text-primary transition-colors" target="_blank">
                  National Portal of India
                </Link>
              </li>
              <li>
                <Link href="https://www.mygov.in" className="hover:text-primary transition-colors" target="_blank">
                  MyGov
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.digitalindia.gov.in"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                >
                  Digital India
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">{t("compliance")}</h3>
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
              <li>
                <Link href="/accessibility" className="hover:text-primary transition-colors">
                  {t("accessibility.statement")}
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  {t("help")}
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
                {t("website.updated")} {new Date().toLocaleDateString("en-IN")}
              </span>
              <span>|</span>
              <span>{t("best.viewed")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
