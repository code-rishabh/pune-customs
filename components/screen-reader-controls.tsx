"use client"

import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { useScreenReader } from "@/contexts/screen-reader-context"

interface ScreenReaderControlsProps {
  showInline?: boolean
  className?: string
}

export function ScreenReaderControls({ showInline = false, className }: ScreenReaderControlsProps) {
  const { isEnabled, toggleScreenReader } = useScreenReader()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleScreenReader}
      className={`text-white hover:bg-white/20 flex items-center gap-1 ${className}`}
      aria-label={isEnabled ? "Disable screen reader" : "Enable screen reader"}
      title={isEnabled ? "Turn off screen reader" : "Turn on screen reader"}
    >
      {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="text-xs hidden sm:inline">
        {isEnabled ? "Screen Reader On" : "Screen Reader Off"}
      </span>
    </Button>
  )
}