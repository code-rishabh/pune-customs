"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Plus, Search, Edit, Trash2, Power, PowerOff, 
  ExternalLink, Newspaper, ArrowUp, ArrowDown
} from "lucide-react"
import { toast } from "sonner"

interface News {
  _id: string
  text: string
  link?: string
  ranking: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function NewsTab() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    text: "",
    link: "",
    ranking: 1,
    isActive: true
  })

  // Fetch news
  const fetchNews = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/news?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setNews(data.news || [])
      } else {
        toast.error(data.error || 'Failed to fetch news')
      }
    } catch (error) {
      toast.error('Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  // Save news
  const saveNews = async () => {
    try {
      const url = editingNews ? `/api/news/${editingNews._id}` : '/api/news'
      const method = editingNews ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          link: formData.link.trim() || undefined
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchNews()
      } else {
        toast.error(data.error || 'Failed to save news')
      }
    } catch (error) {
      toast.error('Failed to save news')
    }
  }

  // Delete news
  const deleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news?')) return
    
    try {
      const response = await fetch(`/api/news/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchNews()
      } else {
        toast.error(data.error || 'Failed to delete news')
      }
    } catch (error) {
      toast.error('Failed to delete news')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchNews()
      } else {
        toast.error(data.error || 'Failed to toggle status')
      }
    } catch (error) {
      toast.error('Failed to toggle status')
    }
  }

  const resetForm = () => {
    setFormData({
      text: "",
      link: "",
      ranking: 1,
      isActive: true
    })
    setShowAddForm(false)
    setEditingNews(null)
  }

  const startEdit = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      text: newsItem.text,
      link: newsItem.link || "",
      ranking: newsItem.ranking,
      isActive: newsItem.isActive
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setFilterActive(filter)
    const activeFilter = filter === 'all' ? undefined : filter === 'active'
    fetchNews(searchQuery, activeFilter)
  }

  const isValidUrl = (url: string) => {
    if (!url || url.trim() === "") return true // Optional field
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">News Management</h2>
          <p className="text-muted-foreground">Manage news items with ranking system</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => fetchNews(searchQuery, filterActive === 'all' ? undefined : filterActive === 'active')}
        >
          Search
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("")
            setFilterActive('all')
            fetchNews()
          }}
        >
          Clear
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'inactive'] as const).map((filter) => (
          <Button
            key={filter}
            variant={filterActive === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange(filter)}
            className="capitalize"
          >
            {filter === 'all' ? 'All News' : `${filter} Only`}
          </Button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingNews ? 'Edit' : 'Add New'} News</CardTitle>
            <CardDescription>
              Create or edit news item with text, optional link, and ranking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">News Text *</Label>
              <Textarea
                id="text"
                placeholder="Enter news text content..."
                rows={3}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link URL (optional)</Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com/news-article (leave empty if no link)"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
              />
              {formData.link && formData.link.trim() !== "" && !isValidUrl(formData.link) && (
                <p className="text-sm text-red-500">Please enter a valid URL</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ranking">Ranking (1 = highest priority)</Label>
              <Input
                id="ranking"
                type="number"
                min="1"
                placeholder="1"
                value={formData.ranking}
                onChange={(e) => setFormData({...formData, ranking: parseInt(e.target.value) || 1})}
              />
              <p className="text-xs text-muted-foreground">Lower numbers appear first (1, 2, 3...)</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="isActive">Active News</Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveNews}
                disabled={!formData.text || (formData.link.trim() !== "" && !isValidUrl(formData.link))}
              >
                {editingNews ? 'Update' : 'Create'} News
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            News ({news.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sorted by ranking (1 = highest priority)</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : news.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No news found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((newsItem) => (
                <div key={newsItem._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Rank #{newsItem.ranking}
                      </Badge>
                      <Badge variant={newsItem.isActive ? 'default' : 'secondary'}>
                        {newsItem.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2 line-clamp-3">
                      {newsItem.text}
                    </p>
                    {newsItem.link && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <ExternalLink className="h-3 w-3" />
                        <a 
                          href={newsItem.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline truncate max-w-md"
                        >
                          {newsItem.link}
                        </a>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(newsItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {newsItem.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(newsItem.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant={newsItem.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(newsItem._id)}
                    >
                      {newsItem.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(newsItem)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNews(newsItem._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}