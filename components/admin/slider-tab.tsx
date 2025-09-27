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
  ExternalLink, Image, ArrowUp, ArrowDown, Eye
} from "lucide-react"
import { toast } from "sonner"

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

export default function SliderTab() {
  const [sliders, setSliders] = useState<SliderItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSlider, setEditingSlider] = useState<SliderItem | null>(null)
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    imageUrl: "",
    link: "",
    priority: 1,
    isActive: true,
    file: null as File | null
  })

  // Fetch sliders
  const fetchSliders = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/sliders?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setSliders(data.sliders || [])
      } else {
        toast.error(data.error || 'Failed to fetch sliders')
      }
    } catch (error) {
      toast.error('Failed to fetch sliders')
    } finally {
      setLoading(false)
    }
  }

  // Save slider
  const saveSlider = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('imageUrl', formData.imageUrl)
    formDataToSend.append('link', formData.link)
    formDataToSend.append('priority', formData.priority.toString())
    formDataToSend.append('isActive', formData.isActive.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingSlider ? `/api/sliders/${editingSlider._id}` : '/api/sliders'
      const method = editingSlider ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchSliders()
      } else {
        toast.error(data.error || 'Failed to save slider')
      }
    } catch (error) {
      toast.error('Failed to save slider')
    }
  }

  // Delete slider
  const deleteSlider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return
    
    try {
      const response = await fetch(`/api/sliders/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchSliders()
      } else {
        toast.error(data.error || 'Failed to delete slider')
      }
    } catch (error) {
      toast.error('Failed to delete slider')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/sliders/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchSliders()
      } else {
        toast.error(data.error || 'Failed to toggle status')
      }
    } catch (error) {
      toast.error('Failed to toggle status')
    }
  }

  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
      imageUrl: "",
      link: "",
      priority: 1,
      isActive: true,
      file: null
    })
    setShowAddForm(false)
    setEditingSlider(null)
  }

  const startEdit = (slider: SliderItem) => {
    setEditingSlider(slider)
    setFormData({
      heading: slider.heading,
      description: slider.description,
      imageUrl: slider.imageUrl,
      link: slider.link || "",
      priority: slider.priority,
      isActive: slider.isActive,
      file: null
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchSliders()
  }, [])

  // Expose search function to parent component
  useEffect(() => {
    // Make the search function available globally for the parent component
    (window as any).sliderSearch = (query: string) => {
      const activeFilter = filterActive === 'all' ? undefined : filterActive === 'active'
      fetchSliders(query, activeFilter)
    }
    
    // Make the clear search function available
    (window as any).sliderClearSearch = () => {
      const activeFilter = filterActive === 'all' ? undefined : filterActive === 'active'
      fetchSliders('', activeFilter)
    }

    // Make the show add form function available
    (window as any).sliderShowAddForm = () => {
      setShowAddForm(true)
    }
    
    return () => {
      delete (window as any).sliderSearch
      delete (window as any).sliderClearSearch
      delete (window as any).sliderShowAddForm
    }
  }, [filterActive])

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
      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingSlider ? 'Edit' : 'Add New'} Slider</CardTitle>
            <CardDescription>
              Create or edit homepage slider with image, heading, description, and optional link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading *</Label>
                <Input
                  id="heading"
                  placeholder="Slider heading"
                  value={formData.heading}
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority (1 = highest)</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 1})}
                />
                <p className="text-xs text-muted-foreground">Lower numbers appear first (1, 2, 3...)</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Slider description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (if not uploading file)</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload Image (recommended)</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
              />
              <p className="text-xs text-muted-foreground">
                Upload an image file or provide an image URL above
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link URL (optional)</Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com/page (leave empty if no link)"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
              />
              {formData.link && formData.link.trim() !== "" && !isValidUrl(formData.link) && (
                <p className="text-sm text-red-500">Please enter a valid URL</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="isActive">Active Slider</Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveSlider}
                disabled={!formData.heading || !formData.description || (!formData.imageUrl && !formData.file) || (formData.link.trim() !== "" && !isValidUrl(formData.link))}
              >
                {editingSlider ? 'Update' : 'Create'} Slider
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sliders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Sliders ({sliders.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sorted by priority (1 = highest priority)</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : sliders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sliders found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {sliders.map((slider) => (
                <div key={slider._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <div className="w-20 h-16 bg-gray-100 rounded flex-shrink-0">
                      <img 
                        src={slider.imageUrl} 
                        alt={slider.heading}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Priority #{slider.priority}
                        </Badge>
                        <Badge variant={slider.isActive ? 'default' : 'secondary'}>
                          {slider.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <h4 className="font-medium truncate">{slider.heading}</h4>
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">
                        {slider.description}
                      </p>
                      {slider.link && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <ExternalLink className="h-3 w-3" />
                          <a 
                            href={slider.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline truncate max-w-md"
                          >
                            {slider.link}
                          </a>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(slider.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(slider.imageUrl, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {slider.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(slider.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant={slider.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(slider._id)}
                    >
                      {slider.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(slider)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSlider(slider._id)}
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