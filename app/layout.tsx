import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Pune Customs - Government of India, Ministry of Finance, Department of Revenue",
  description:
    "Official website of Pune Customs - providing customs services, notices, tenders, and information for import/export activities in Pune region.",
  generator: "v0.app",
  keywords:
    "Pune Customs, Indian Customs, Import Export, Government of India, Ministry of Finance, Department of Revenue",
  authors: [{ name: "Pune Customs Office" }],
  openGraph: {
    title: "Pune Customs - Official Website",
    description: "Official website of Pune Customs providing customs services and information",
    type: "website",
    locale: "en_IN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <LanguageProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </LanguageProvider>
          <Toaster position="top-right" />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
