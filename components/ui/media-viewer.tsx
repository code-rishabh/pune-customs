"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, Video, FileText, Newspaper, ExternalLink, Calendar, Star, X } from "lucide-react"

interface MediaItem {
  _id: string
  type: 'photo' | 'video' | 'document' | 'press'
  heading: string
  description: string
  date: string
  link: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

interface MediaViewerProps {
  item: MediaItem | null
  open: boolean
  onClose: () => void
}

export default function MediaViewer({ item, open, onClose }: MediaViewerProps) {
  if (!item) return null

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'photo': return <ImageIcon className="h-5 w-5" />
      case 'video': return <Video className="h-5 w-5" />
      case 'document': return <FileText className="h-5 w-5" />
      case 'press': return <Newspaper className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
  }

  const renderMediaContent = () => {
    const isExternalLink = item.link.startsWith('http')
    
    switch (item.type) {
      case 'photo':
        return (
          <div className="space-y-4">
            {!isExternalLink ? (
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <img 
                  src={item.link} 
                  alt={item.heading}
                  className="w-full h-auto max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling!.classList.remove('hidden')
                  }}
                />
                <div className="hidden flex items-center justify-center h-48 text-muted-foreground">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Image not found</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                <div className="text-center">
                  <ExternalLink className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">External image link</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    View External Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            {!isExternalLink ? (
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <video 
                  controls 
                  className="w-full h-auto max-h-96"
                  preload="metadata"
                >
                  <source src={item.link} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : item.link.includes('youtube.com') || item.link.includes('youtu.be') ? (
              <div className="aspect-video">
                <iframe
                  src={item.link.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={item.heading}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">External video link</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    Watch Video
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case 'document':
        return (
          <div className="space-y-4">
            {!isExternalLink && item.link.endsWith('.pdf') ? (
              <div className="h-96">
                <iframe
                  src={item.link}
                  className="w-full h-full rounded-lg border"
                  title={item.heading}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {isExternalLink ? 'External document link' : 'Document file'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    Open Document
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case 'press':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
              <div className="text-center">
                <Newspaper className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Press coverage article</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  Read Article
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getMediaIcon(item.type)}
            <DialogTitle className="text-xl">{item.heading}</DialogTitle>
            {item.featured && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>
          <DialogDescription className="text-left">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(item.date).toLocaleDateString()}
              </div>
              <Badge variant="outline" className="capitalize">
                {item.type}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Media Content */}
          {renderMediaContent()}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Last Updated:</strong> {new Date(item.updatedAt).toLocaleString()}
            </div>
            <div className="md:col-span-2">
              <strong>Link:</strong> 
              <span className="ml-2 font-mono text-xs bg-muted px-2 py-1 rounded break-all">
                {item.link}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => window.open(item.link, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Original
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}