"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "@/components/language-provider"

interface ScreenReaderContextType {
  isEnabled: boolean
  isReading: boolean
  currentText: string
  toggleScreenReader: () => void
  readText: (text: string) => void
  stopReading: () => void
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setVolume: (volume: number) => void
  settings: {
    rate: number
    pitch: number
    volume: number
  }
}

const ScreenReaderContext = createContext<ScreenReaderContextType | undefined>(undefined)

export function ScreenReaderProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [settings, setSettings] = useState({
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8
  })
  const { language } = useTranslation()

  // Load saved preferences
  useEffect(() => {
    const savedEnabled = localStorage.getItem('screenReaderEnabled') === 'true'
    const savedSettings = localStorage.getItem('screenReaderSettings')
    
    setIsEnabled(savedEnabled)
    
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
      } catch (error) {
        console.warn('Failed to parse screen reader settings:', error)
      }
    }
  }, [])

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('screenReaderEnabled', isEnabled.toString())
  }, [isEnabled])

  useEffect(() => {
    localStorage.setItem('screenReaderSettings', JSON.stringify(settings))
  }, [settings])

  const getVoice = () => {
    if (!window.speechSynthesis) return null

    const voices = window.speechSynthesis.getVoices()
    
    // Try to find language-specific voices
    if (language === 'hi') {
      // Look for Hindi voices
      const hindiVoice = voices.find(voice => 
        voice.lang.startsWith('hi') || 
        voice.name.toLowerCase().includes('hindi') ||
        voice.name.toLowerCase().includes('devanagari')
      )
      if (hindiVoice) return hindiVoice
    } else {
      // Look for English voices
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') || 
        voice.name.toLowerCase().includes('english')
      )
      if (englishVoice) return englishVoice
    }

    // Fallback to default voice
    return voices[0] || null
  }

  const readText = (text: string) => {
    if (!isEnabled || !text.trim() || !window.speechSynthesis) return

    // Stop any ongoing speech
    window.speechSynthesis.cancel()
    
    setCurrentText(text)
    setIsReading(true)

    const utterance = new SpeechSynthesisUtterance(text)
    const voice = getVoice()
    
    if (voice) {
      utterance.voice = voice
    }
    
    // Set language based on current language setting
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US'
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.volume = settings.volume

    utterance.onend = () => {
      setIsReading(false)
      setCurrentText("")
    }

    utterance.onerror = (error) => {
      console.warn('Speech synthesis error:', error)
      setIsReading(false)
      setCurrentText("")
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopReading = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      setCurrentText("")
    }
  }

  const toggleScreenReader = () => {
    const newEnabled = !isEnabled
    setIsEnabled(newEnabled)
    
    if (!newEnabled) {
      stopReading()
    }
  }

  const setRate = (rate: number) => {
    setSettings(prev => ({ ...prev, rate }))
  }

  const setPitch = (pitch: number) => {
    setSettings(prev => ({ ...prev, pitch }))
  }

  const setVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, volume }))
  }

  return (
    <ScreenReaderContext.Provider
      value={{
        isEnabled,
        isReading,
        currentText,
        toggleScreenReader,
        readText,
        stopReading,
        setRate,
        setPitch,
        setVolume,
        settings,
      }}
    >
      {children}
    </ScreenReaderContext.Provider>
  )
}

export function useScreenReader() {
  const context = useContext(ScreenReaderContext)
  if (context === undefined) {
    throw new Error("useScreenReader must be used within a ScreenReaderProvider")
  }
  return context
}