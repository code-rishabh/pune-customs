import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ScreenReaderProvider } from "@/contexts/screen-reader-context"
import { ScreenReader } from "@/components/screen-reader"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Pune Customs - Government of India, Ministry of Finance, Department of Revenue",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  description:
    "Official website of Pune Customs - providing customs services, notices, tenders, and information for import/export activities in Pune region.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LanguageProvider>
              <ScreenReaderProvider>
                <ScreenReader>
                  <Suspense fallback={null}>{children}</Suspense>
                </ScreenReader>
              </ScreenReaderProvider>
            </LanguageProvider>
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
