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
  Eye, Trophy
} from "lucide-react"
import { toast } from "sonner"

interface AchievementItem {
  _id: string
  heading: string
  description: string
  imageUrl: string
  priority: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null)
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    imageUrl: "",
    priority: 1,
    isActive: true,
    file: null as File | null
  })

  // Fetch achievements
  const fetchAchievements = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/achievements?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setAchievements(data.achievements || [])
      } else {
        toast.error(data.error || 'Failed to fetch achievements')
      }
    } catch (error) {
      toast.error('Failed to fetch achievements')
    } finally {
      setLoading(false)
    }
  }

  // Save achievement
  const saveAchievement = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('imageUrl', formData.imageUrl)
    formDataToSend.append('priority', formData.priority.toString())
    formDataToSend.append('isActive', formData.isActive.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingAchievement ? `/api/achievements/${editingAchievement._id}` : '/api/achievements'
      const method = editingAchievement ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchAchievements()
      } else {
        toast.error(data.error || 'Failed to save achievement')
      }
    } catch (error) {
      toast.error('Failed to save achievement')
    }
  }

  // Delete achievement
  const deleteAchievement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return
    
    try {
      const response = await fetch(`/api/achievements/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchAchievements()
      } else {
        toast.error(data.error || 'Failed to delete achievement')
      }
    } catch (error) {
      toast.error('Failed to delete achievement')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/achievements/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchAchievements()
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
      priority: 1,
      isActive: true,
      file: null
    })
    setShowAddForm(false)
    setEditingAchievement(null)
  }

  const startEdit = (achievement: AchievementItem) => {
    setEditingAchievement(achievement)
    setFormData({
      heading: achievement.heading,
      description: achievement.description,
      imageUrl: achievement.imageUrl,
      priority: achievement.priority,
      isActive: achievement.isActive,
      file: null
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchAchievements()
  }, [])

  // Expose functions to parent component for search and add functionality
  useEffect(() => {
    (window as any).achievementSearch = (query: string) => {
      const activeFilter = filterActive === 'all' ? undefined : filterActive === 'active'
      fetchAchievements(query, activeFilter)
    }
    
    (window as any).achievementClearSearch = () => {
      const activeFilter = filterActive === 'all' ? undefined : filterActive === 'active'
      fetchAchievements('', activeFilter)
    }

    (window as any).achievementShowAddForm = () => {
      setShowAddForm(true)
    }
    
    return () => {
      delete (window as any).achievementSearch
      delete (window as any).achievementClearSearch
      delete (window as any).achievementShowAddForm
    }
  }, [filterActive])

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAchievement ? 'Edit' : 'Add New'} Achievement</CardTitle>
            <CardDescription>
              Create or edit achievement with image, heading, description, and priority
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading *</Label>
                <Input
                  id="heading"
                  placeholder="Achievement heading"
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
                placeholder="Achievement description"
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

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="isActive">Active Achievement</Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveAchievement}
                disabled={!formData.heading || !formData.description || (!formData.imageUrl && !formData.file)}
              >
                {editingAchievement ? 'Update' : 'Create'} Achievement
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements ({achievements.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sorted by priority (1 = highest priority)</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No achievements found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <div className="w-20 h-16 bg-gray-100 rounded flex-shrink-0">
                      <img 
                        src={achievement.imageUrl} 
                        alt={achievement.heading}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Priority #{achievement.priority}
                        </Badge>
                        <Badge variant={achievement.isActive ? 'default' : 'secondary'}>
                          {achievement.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <h4 className="font-medium truncate">{achievement.heading}</h4>
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(achievement.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(achievement.imageUrl, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant={achievement.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(achievement._id)}
                    >
                      {achievement.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(achievement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAchievement(achievement._id)}
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