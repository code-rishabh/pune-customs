"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { getNewsItemsClient } from "@/lib/news"
import { trackWebsiteUpdate } from "@/lib/website-update"

interface NewsTabProps {
  newsItem: string
  setNewsItem: (value: string) => void
  newsList: string[]
  setNewsList: (value: string[]) => void
}

export default function NewsTab({ newsItem, setNewsItem, newsList, setNewsList }: NewsTabProps) {
  const handleAddNews = async () => {
    const text = newsItem.trim()
    if (!text) return
    
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: text }),
    })
    
    if (res.ok) {
      setNewsItem("")
      const data = await res.json()
      if (Array.isArray(data.items)) setNewsList(data.items)
      // Track website update
      await trackWebsiteUpdate(`Added news item: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`, "Admin")
    }
  }

  const handleRefreshNews = async () => {
    const items = await getNewsItemsClient()
    setNewsList(items)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Manage News Ticker</h2>
          <p className="text-muted-foreground">Add items that appear in the homepage news ribbon</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add News Item</CardTitle>
          <CardDescription>Short and crisp; avoid very long sentences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="news-item">News text</Label>
            <Input 
              id="news-item" 
              placeholder="Enter news text" 
              value={newsItem} 
              onChange={(e) => setNewsItem(e.target.value)} 
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddNews}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Ticker
            </Button>
            <Button variant="outline" onClick={handleRefreshNews}>
              Refresh List
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Current Items</Label>
            <div className="grid gap-2">
              {newsList.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items yet. Add the first one above.</p>
              ) : (
                newsList.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{item}</span>
                    <Badge variant="secondary">#{i + 1}</Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}