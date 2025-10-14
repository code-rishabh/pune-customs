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
  Star, Edit, Trash2, Plus, Search, Eye, ExternalLink
} from "lucide-react"
import { toast } from "sonner"
import MediaViewer from "@/components/ui/media-viewer"
import SliderTab from "./slider-tab"

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
  setSlideForm: (form: { image: string; title: string; description: string }) => void
  slideList: { image: string; title: string; description: string }[]
  setSlideList: (slides: { image: string; title: string; description: string }[]) => void
  uploadStatus: "idle" | "uploading" | "success" | "error"
  setUploadStatus: (status: "idle" | "uploading" | "success" | "error") => void
  addStatus: "idle" | "adding" | "success" | "error"
  setAddStatus: (status: "idle" | "adding" | "success" | "error") => void
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
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video' | 'document' | 'press' | 'slider'>('photo')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingItem, setViewingItem] = useState<MediaItem | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    link: "",
    featured: false
  })

  // Fetch media items by type
  const fetchMediaItems = async (type: string, search?: string) => {
    if (type === 'slider') return // Skip for slider tab
    
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      
      const response = await fetch(`/api/media?type=${type}&${params}`)
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

  // Save media item
  const saveMediaItem = async () => {
    try {
      const url = editingItem ? `/api/media/${editingItem._id}` : '/api/media'
      const method = editingItem ? 'PUT' : 'POST'
      
      let body
      let headers: HeadersInit = {}
      
      // Check if we have a file input with a file
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      const file = fileInput?.files?.[0]
      
      if (file && !editingItem) {
        // Use FormData for file uploads (only for new items)
        const formDataBody = new FormData()
        formDataBody.append('type', activeMediaTab)
        formDataBody.append('heading', formData.heading)
        formDataBody.append('description', formData.description)
        formDataBody.append('date', formData.date)
        formDataBody.append('link', formData.link)
        formDataBody.append('featured', formData.featured.toString())
        formDataBody.append('file', file)
        
        body = formDataBody
        // Don't set Content-Type header, let browser set it with boundary
      } else {
        // Use JSON for regular updates or when no file
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify({
          ...formData,
          type: activeMediaTab
        })
      }
      
      const response = await fetch(url, {
        method,
        headers,
        body
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
    if (!confirm('Are you sure you want to delete this media item?')) return
    
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
        toast.error(data.error || 'Failed to toggle featured status')
      }
    } catch (error) {
      toast.error('Failed to toggle featured status')
    }
  }

  // File upload handler
  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setFormData(prev => ({ ...prev, link: data.path }))
        toast.success('File uploaded successfully')
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      link: "",
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
      date: item.date,
      link: item.link,
      featured: item.featured || false
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    if (activeMediaTab !== 'slider') {
      fetchMediaItems(activeMediaTab)
    }
  }, [activeMediaTab])

  const getTabTitle = () => {
    switch (activeMediaTab) {
      case 'slider': return 'Slider Management'
      default: return 'Media Gallery Management'
    }
  }

  const getTabDescription = () => {
    switch (activeMediaTab) {
      case 'slider': return 'Manage homepage slider images with priority ordering'
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
          } else {
            setShowAddForm(true)
          }
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add {activeMediaTab === 'slider' ? 'Slider' : activeMediaTab}
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
            } else {
              fetchMediaItems(activeMediaTab)
            }
          }}
        >
          Clear
        </Button>
      </div>

      {/* Media Type Tabs */}
      <Tabs value={activeMediaTab} onValueChange={(value) => setActiveMediaTab(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
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
        </TabsList>

        {/* Photo Tab */}
        <TabsContent value="photo">
          <MediaTabContent 
            type="photo"
            items={mediaItems}
            loading={loading}
            showAddForm={showAddForm}
            editingItem={editingItem}
            formData={formData}
            setFormData={setFormData}
            onSave={saveMediaItem}
            onDelete={deleteMediaItem}
            onToggleFeatured={toggleFeatured}
            onEdit={startEdit}
            onView={setViewingItem}
            onCancel={resetForm}
            onFileUpload={handleFileUpload}
            uploading={uploading}
          />
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video">
          <MediaTabContent 
            type="video"
            items={mediaItems}
            loading={loading}
            showAddForm={showAddForm}
            editingItem={editingItem}
            formData={formData}
            setFormData={setFormData}
            onSave={saveMediaItem}
            onDelete={deleteMediaItem}
            onToggleFeatured={toggleFeatured}
            onEdit={startEdit}
            onView={setViewingItem}
            onCancel={resetForm}
            onFileUpload={handleFileUpload}
            uploading={uploading}
          />
        </TabsContent>

        {/* Document Tab */}
        <TabsContent value="document">
          <MediaTabContent 
            type="document"
            items={mediaItems}
            loading={loading}
            showAddForm={showAddForm}
            editingItem={editingItem}
            formData={formData}
            setFormData={setFormData}
            onSave={saveMediaItem}
            onDelete={deleteMediaItem}
            onToggleFeatured={toggleFeatured}
            onEdit={startEdit}
            onView={setViewingItem}
            onCancel={resetForm}
            onFileUpload={handleFileUpload}
            uploading={uploading}
          />
        </TabsContent>

        {/* Press Tab */}
        <TabsContent value="press">
          <MediaTabContent 
            type="press"
            items={mediaItems}
            loading={loading}
            showAddForm={showAddForm}
            editingItem={editingItem}
            formData={formData}
            setFormData={setFormData}
            onSave={saveMediaItem}
            onDelete={deleteMediaItem}
            onToggleFeatured={toggleFeatured}
            onEdit={startEdit}
            onView={setViewingItem}
            onCancel={resetForm}
            onFileUpload={handleFileUpload}
            uploading={uploading}
          />
        </TabsContent>

        {/* Slider Tab */}
        <TabsContent value="slider">
          <SliderTab />
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

// Media Tab Content Component
interface MediaTabContentProps {
  type: string
  items: MediaItem[]
  loading: boolean
  showAddForm: boolean
  editingItem: MediaItem | null
  formData: any
  setFormData: (data: any) => void
  onSave: () => void
  onDelete: (id: string) => void
  onToggleFeatured: (id: string) => void
  onEdit: (item: MediaItem) => void
  onView: (item: MediaItem) => void
  onCancel: () => void
  onFileUpload: (file: File) => void
  uploading: boolean
}

function MediaTabContent({ 
  type, 
  items, 
  loading, 
  showAddForm, 
  editingItem, 
  formData, 
  setFormData, 
  onSave, 
  onDelete, 
  onToggleFeatured, 
  onEdit, 
  onView, 
  onCancel,
  onFileUpload,
  uploading
}: MediaTabContentProps) {
  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit' : 'Add New'} {type}</CardTitle>
            <CardDescription>
              {type === 'photo' && 'Add photos from events, activities, and important moments'}
              {type === 'video' && 'Add videos showcasing customs operations and events'}
              {type === 'document' && 'Add important documents and publications'}
              {type === 'press' && 'Add press releases and media coverage'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept={
                    type === 'photo' ? 'image/*' :
                    type === 'video' ? 'video/*' :
                    type === 'document' ? '.pdf,.doc,.docx,.txt' :
                    '*/*'
                  }
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      onFileUpload(file)
                    }
                  }}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  disabled={uploading}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {formData.link && (
                <div className="text-sm text-green-600">
                  ✓ File uploaded: {formData.link}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading *</Label>
                <Input
                  id="heading"
                  placeholder={`${type} heading`}
                  value={formData.heading}
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder={`${type} description`}
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link/URL *</Label>
              <Input
                id="link"
                placeholder={`${type} URL or file link`}
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
              />
              <div className="text-xs text-muted-foreground">
                Upload a file above or enter a direct URL
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              />
              <Label htmlFor="featured">Featured {type}</Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={onSave}
                disabled={!formData.heading || !formData.link || uploading}
              >
                {editingItem ? 'Update' : 'Create'} {type}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === 'photo' && <ImageIcon className="h-5 w-5" />}
            {type === 'video' && <Video className="h-5 w-5" />}
            {type === 'document' && <FileText className="h-5 w-5" />}
            {type === 'press' && <Newspaper className="h-5 w-5" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}s ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No {type}s found. Add the first one above.
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
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
                      <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant={item.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => onToggleFeatured(item._id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item._id)}
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