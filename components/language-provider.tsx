"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation, type Language, type TranslationKey } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage()

  const t = (key: TranslationKey) => getTranslation(key, language)

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
