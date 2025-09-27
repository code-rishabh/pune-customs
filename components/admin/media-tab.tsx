"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, Image as ImageIcon, Video, FileText, Newspaper, 
  Star, Edit, Trash2, Plus, Search, Eye, ExternalLink, Trophy
} from "lucide-react"
import { toast } from "sonner"
import MediaViewer from "@/components/ui/media-viewer"
import SliderTab from "./slider-tab"
import AchievementsTab from "./achievements-tab"

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

interface SliderItem {
  _id: string
  heading: string
  description: string
  imageUrl: string
  link?: string
  priority: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface MediaTabProps {
  slideForm: { image: string; title: string; description: string }
  setSlideForm: (value: { image: string; title: string; description: string }) => void
  slideList: Array<{ image: string; title: string; description: string }>
  setSlideList: (value: Array<{ image: string; title: string; description: string }>) => void
  uploadStatus: "idle" | "uploading" | "success" | "error"
  setUploadStatus: (value: "idle" | "uploading" | "success" | "error") => void
  addStatus: "idle" | "adding" | "success" | "error"
  setAddStatus: (value: "idle" | "adding" | "success" | "error") => void
}

export default function MediaTab({ 
  slideForm, 
  setSlideForm, 
  slideList, 
  setSlideList, 
  uploadStatus, 
  setUploadStatus, 
  addStatus, 
  setAddStatus 
}: MediaTabProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video' | 'document' | 'press' | 'slider' | 'achievements'>('photo')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingItem, setViewingItem] = useState<MediaItem | null>(null)
  
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    link: "",
    file: null as File | null,
    featured: false
  })

  // Fetch media items
  const fetchMediaItems = async (type?: string, search?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (type) params.set('type', type)
      if (search) params.set('search', search)
      
      const response = await fetch(`/api/media?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setMediaItems(data.items || [])
      } else {
        toast.error(data.error || 'Failed to fetch media items')
      }
    } catch (error) {
      toast.error('Failed to fetch media items')
    } finally {
      setLoading(false)
    }
  }

  // Create or update media item
  const saveMediaItem = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('type', activeMediaTab)
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('date', formData.date)
    formDataToSend.append('link', formData.link)
    formDataToSend.append('featured', formData.featured.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingItem ? `/api/media/${editingItem._id}` : '/api/media'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchMediaItems(activeMediaTab)
      } else {
        toast.error(data.error || 'Failed to save media item')
      }
    } catch (error) {
      toast.error('Failed to save media item')
    }
  }

  // Delete media item
  const deleteMediaItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const response = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchMediaItems(activeMediaTab)
      } else {
        toast.error(data.error || 'Failed to delete media item')
      }
    } catch (error) {
      toast.error('Failed to delete media item')
    }
  }

  // Toggle featured status
  const toggleFeatured = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}/toggle-featured`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchMediaItems(activeMediaTab)
      } else {
        toast.error('Failed to toggle featured status')
      }
    } catch (error) {
      toast.error('Failed to toggle featured status')
    }
  }

  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      link: "",
      file: null,
      featured: false
    })
    setShowAddForm(false)
    setEditingItem(null)
  }

  const startEdit = (item: MediaItem) => {
    setEditingItem(item)
    setFormData({
      heading: item.heading,
      description: item.description,
      date: item.date.split('T')[0],
      link: item.link,
      file: null,
      featured: item.featured || false
    })
    setShowAddForm(true)
  }

  // Load media items when tab changes
  useEffect(() => {
    fetchMediaItems(activeMediaTab)
  }, [activeMediaTab])

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'photo': return <ImageIcon className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'press': return <Newspaper className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getFileAccept = () => {
    switch (activeMediaTab) {
      case 'photo': return 'image/*'
      case 'video': return 'video/*'
      case 'document': return '.pdf,.doc,.docx'
      default: return '*/*'
    }
  }

  // Get dynamic title and description based on active tab
  const getTabTitle = () => {
    switch (activeMediaTab) {
      case 'slider': return 'Slider Management'
      case 'achievements': return 'Achievements Management'
      default: return 'Media Gallery Management'
    }
  }

  const getTabDescription = () => {
    switch (activeMediaTab) {
      case 'slider': return 'Manage homepage slider images with priority ordering'
      case 'achievements': return 'Manage our achievements with priority system'
      default: return 'Manage photos, videos, documents, and press coverage'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">{getTabTitle()}</h2>
          <p className="text-muted-foreground">{getTabDescription()}</p>
        </div>
        <Button onClick={() => {
          if (activeMediaTab === 'slider') {
            // Call the exposed slider show add form function
            if ((window as any).sliderShowAddForm) {
              (window as any).sliderShowAddForm()
            }
          } else if (activeMediaTab === 'achievements') {
            // Call the exposed achievement show add form function
            if ((window as any).achievementShowAddForm) {
              (window as any).achievementShowAddForm()
            }
          } else {
            setShowAddForm(true)
          }
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add {activeMediaTab === 'slider' ? 'Slider' : activeMediaTab === 'achievements' ? 'Achievement' : activeMediaTab}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeMediaTab}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            if (activeMediaTab === 'slider') {
              // Call the exposed slider search function
              if ((window as any).sliderSearch) {
                (window as any).sliderSearch(searchQuery)
              }
            } else if (activeMediaTab === 'achievements') {
              // Call the exposed achievement search function
              if ((window as any).achievementSearch) {
                (window as any).achievementSearch(searchQuery)
              }
            } else {
              fetchMediaItems(activeMediaTab, searchQuery)
            }
          }}
        >
          Search
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("")
            if (activeMediaTab === 'slider') {
              // Call the exposed slider clear search function
              if ((window as any).sliderClearSearch) {
                (window as any).sliderClearSearch()
              }
            } else if (activeMediaTab === 'achievements') {
              // Call the exposed achievement clear search function
              if ((window as any).achievementClearSearch) {
                (window as any).achievementClearSearch()
              }
            } else {
              fetchMediaItems(activeMediaTab)
            }
          }}
        >
          Clear
        </Button>
      </div>

      {/* Filter Tabs - Show filter buttons for slider and achievements tabs */}
      {(activeMediaTab === 'slider' || activeMediaTab === 'achievements') && (
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((filter) => (
            <Button
              key={filter}
              variant="outline" // We'll handle the active state in SliderTab
              size="sm"
              className="capitalize"
            >
              {filter === 'all' ? `All ${activeMediaTab === 'slider' ? 'Sliders' : 'Achievements'}` : `${filter} Only`}
            </Button>
          ))}
        </div>
      )}

      {/* Media Type Tabs */}
      <Tabs value={activeMediaTab} onValueChange={(value) => setActiveMediaTab(value as any)}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="photo" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="press" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Press
          </TabsTrigger>
          <TabsTrigger value="slider" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Slider
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        {/* Existing tab content for photo, video, document, press */}
        <TabsContent value="photo" className="space-y-4">
          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingItem ? 'Edit' : 'Add New'} {activeMediaTab}</CardTitle>
                <CardDescription>
                  {activeMediaTab === 'photo' && 'Add photos to the gallery with optional featuring for homepage'}
                  {activeMediaTab === 'video' && 'Add videos with file upload or external links'}
                  {activeMediaTab === 'document' && 'Upload PDF documents or add external document links'}
                  {activeMediaTab === 'press' && 'Add press coverage with news channel or newspaper links'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      placeholder="Enter heading"
                      value={formData.heading}
                      onChange={(e) => setFormData({...formData, heading: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">External Link (optional)</Label>
                  <Input
                    id="link"
                    placeholder={
                      activeMediaTab === 'press' ? 'News article URL' : 
                      activeMediaTab === 'video' ? 'YouTube/Vimeo URL' : 
                      'External URL'
                    }
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File (optional)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={getFileAccept()}
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Either upload a file or provide an external link
                  </p>
                </div>

                {activeMediaTab === 'photo' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Feature on homepage
                    </Label>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={saveMediaItem}
                    disabled={!formData.heading || !formData.description}
                  >
                    {editingItem ? 'Update' : 'Add'} {activeMediaTab}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getMediaIcon(activeMediaTab)}
                {activeMediaTab}s ({mediaItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : mediaItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {activeMediaTab}s found. Add the first one above.
                </div>
              ) : (
                <div className="grid gap-4">
                  {mediaItems.map((item) => (
                    <div key={item._id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate">{item.heading}</h4>
                          {item.featured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="truncate max-w-xs">{item.link}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {item.link.startsWith('http') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.link, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {activeMediaTab === 'photo' && (
                          <Button
                            variant={item.featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleFeatured(item._id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMediaItem(item._id)}
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
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingItem ? 'Edit' : 'Add New'} {activeMediaTab}</CardTitle>
                <CardDescription>
                  {activeMediaTab === 'photo' && 'Add photos to the gallery with optional featuring for homepage'}
                  {activeMediaTab === 'video' && 'Add videos with file upload or external links'}
                  {activeMediaTab === 'document' && 'Upload PDF documents or add external document links'}
                  {activeMediaTab === 'press' && 'Add press coverage with news channel or newspaper links'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      placeholder="Enter heading"
                      value={formData.heading}
                      onChange={(e) => setFormData({...formData, heading: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">External Link (optional)</Label>
                  <Input
                    id="link"
                    placeholder={
                      activeMediaTab === 'press' ? 'News article URL' : 
                      activeMediaTab === 'video' ? 'YouTube/Vimeo URL' : 
                      'External URL'
                    }
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File (optional)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={getFileAccept()}
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Either upload a file or provide an external link
                  </p>
                </div>

                {activeMediaTab === 'photo' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Feature on homepage
                    </Label>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={saveMediaItem}
                    disabled={!formData.heading || !formData.description}
                  >
                    {editingItem ? 'Update' : 'Add'} {activeMediaTab}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getMediaIcon(activeMediaTab)}
                {activeMediaTab}s ({mediaItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : mediaItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {activeMediaTab}s found. Add the first one above.
                </div>
              ) : (
                <div className="grid gap-4">
                  {mediaItems.map((item) => (
                    <div key={item._id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate">{item.heading}</h4>
                          {item.featured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="truncate max-w-xs">{item.link}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {item.link.startsWith('http') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.link, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {activeMediaTab === 'photo' && (
                          <Button
                            variant={item.featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleFeatured(item._id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMediaItem(item._id)}
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
        </TabsContent>

        <TabsContent value="document" className="space-y-4">
          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingItem ? 'Edit' : 'Add New'} {activeMediaTab}</CardTitle>
                <CardDescription>
                  {activeMediaTab === 'photo' && 'Add photos to the gallery with optional featuring for homepage'}
                  {activeMediaTab === 'video' && 'Add videos with file upload or external links'}
                  {activeMediaTab === 'document' && 'Upload PDF documents or add external document links'}
                  {activeMediaTab === 'press' && 'Add press coverage with news channel or newspaper links'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      placeholder="Enter heading"
                      value={formData.heading}
                      onChange={(e) => setFormData({...formData, heading: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">External Link (optional)</Label>
                  <Input
                    id="link"
                    placeholder={
                      activeMediaTab === 'press' ? 'News article URL' : 
                      activeMediaTab === 'video' ? 'YouTube/Vimeo URL' : 
                      'External URL'
                    }
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File (optional)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={getFileAccept()}
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Either upload a file or provide an external link
                  </p>
                </div>

                {activeMediaTab === 'photo' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Feature on homepage
                    </Label>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={saveMediaItem}
                    disabled={!formData.heading || !formData.description}
                  >
                    {editingItem ? 'Update' : 'Add'} {activeMediaTab}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getMediaIcon(activeMediaTab)}
                {activeMediaTab}s ({mediaItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : mediaItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {activeMediaTab}s found. Add the first one above.
                </div>
              ) : (
                <div className="grid gap-4">
                  {mediaItems.map((item) => (
                    <div key={item._id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate">{item.heading}</h4>
                          {item.featured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="truncate max-w-xs">{item.link}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {item.link.startsWith('http') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.link, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {activeMediaTab === 'photo' && (
                          <Button
                            variant={item.featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleFeatured(item._id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMediaItem(item._id)}
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
        </TabsContent>

        <TabsContent value="press" className="space-y-4">
          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingItem ? 'Edit' : 'Add New'} {activeMediaTab}</CardTitle>
                <CardDescription>
                  {activeMediaTab === 'photo' && 'Add photos to the gallery with optional featuring for homepage'}
                  {activeMediaTab === 'video' && 'Add videos with file upload or external links'}
                  {activeMediaTab === 'document' && 'Upload PDF documents or add external document links'}
                  {activeMediaTab === 'press' && 'Add press coverage with news channel or newspaper links'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      placeholder="Enter heading"
                      value={formData.heading}
                      onChange={(e) => setFormData({...formData, heading: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">External Link (optional)</Label>
                  <Input
                    id="link"
                    placeholder={
                      activeMediaTab === 'press' ? 'News article URL' : 
                      activeMediaTab === 'video' ? 'YouTube/Vimeo URL' : 
                      'External URL'
                    }
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File (optional)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={getFileAccept()}
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Either upload a file or provide an external link
                  </p>
                </div>

                {activeMediaTab === 'photo' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Feature on homepage
                    </Label>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={saveMediaItem}
                    disabled={!formData.heading || !formData.description}
                  >
                    {editingItem ? 'Update' : 'Add'} {activeMediaTab}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getMediaIcon(activeMediaTab)}
                {activeMediaTab}s ({mediaItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : mediaItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {activeMediaTab}s found. Add the first one above.
                </div>
              ) : (
                <div className="grid gap-4">
                  {mediaItems.map((item) => (
                    <div key={item._id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate">{item.heading}</h4>
                          {item.featured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="truncate max-w-xs">{item.link}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {item.link.startsWith('http') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.link, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {activeMediaTab === 'photo' && (
                          <Button
                            variant={item.featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleFeatured(item._id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMediaItem(item._id)}
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
        </TabsContent>

        {/* Slider Tab */}
        <TabsContent value="slider">
          <SliderTab />
        </TabsContent>

        {/* New Achievements Tab */}
        <TabsContent value="achievements">
          <AchievementsTab />
        </TabsContent>
      </Tabs>

      {/* Media Viewer Dialog - Only show for non-slider tabs */}
      {activeMediaTab !== 'slider' && (
        <MediaViewer 
          item={viewingItem}
          open={!!viewingItem}
          onClose={() => setViewingItem(null)}
        />
      )}
    </div>
  )
}