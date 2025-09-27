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
  Plus, Search, Edit, Trash2, Eye, FileText, 
  Calendar, Clock, Download, Power, PowerOff 
} from "lucide-react"
import { toast } from "sonner"

interface Notice {
  _id: string
  heading: string
  subheading: string
  publishedDate: string
  validUntil: string
  documentUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function NoticesTab() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    publishedDate: new Date().toISOString().split('T')[0],
    validUntil: "",
    file: null as File | null,
    isActive: true,
    featured: false
  })

  // Fetch notices
  const fetchNotices = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/notices?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setNotices(data.notices || [])
      } else {
        toast.error(data.error || 'Failed to fetch notices')
      }
    } catch (error) {
      toast.error('Failed to fetch notices')
    } finally {
      setLoading(false)
    }
  }

  // Save notice (create or update)
  const saveNotice = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('subheading', formData.subheading)
    formDataToSend.append('publishedDate', formData.publishedDate)
    formDataToSend.append('validUntil', formData.validUntil)
    formDataToSend.append('isActive', formData.isActive.toString())
    formDataToSend.append('featured', formData.featured.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingNotice ? `/api/notices/${editingNotice._id}` : '/api/notices'
      const method = editingNotice ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchNotices()
      } else {
        toast.error(data.error || 'Failed to save notice')
      }
    } catch (error) {
      toast.error('Failed to save notice')
    }
  }

  // Delete notice
  const deleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return
    
    try {
      const response = await fetch(`/api/notices/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchNotices()
      } else {
        toast.error(data.error || 'Failed to delete notice')
      }
    } catch (error) {
      toast.error('Failed to delete notice')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/notices/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchNotices()
      } else {
        toast.error(data.error || 'Failed to toggle status')
      }
    } catch (error) {
      toast.error('Failed to toggle status')
    }
  }

  // Toggle featured status
  const toggleFeatured = async (id: string) => {
    try {
      const response = await fetch(`/api/notices/${id}/toggle-featured`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchNotices()
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
      subheading: "",
      publishedDate: new Date().toISOString().split('T')[0],
      validUntil: "",
      file: null,
      isActive: true,
      featured: false
    })
    setShowAddForm(false)
    setEditingNotice(null)
  }

  const startEdit = (notice: Notice) => {
    setFormData({
      heading: notice.heading,
      subheading: notice.subheading,
      publishedDate: notice.publishedDate.split('T')[0],
      validUntil: notice.validUntil.split('T')[0],
      file: null,
      isActive: notice.isActive,
      featured: notice.featured || false
    })
    setEditingNotice(notice)
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setFilterActive(filter)
    const activeFilter = filter === 'all' ? undefined : filter === 'active'
    fetchNotices(searchQuery, activeFilter)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Notices Management</h2>
          <p className="text-muted-foreground">Manage official notices and announcements</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Notice
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => fetchNotices(searchQuery, filterActive === 'all' ? undefined : filterActive === 'active')}
        >
          Search
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("")
            setFilterActive('all')
            fetchNotices()
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
            {filter === 'all' ? 'All Notices' : `${filter} Only`}
          </Button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingNotice ? 'Edit' : 'Add New'} Notice</CardTitle>
            <CardDescription>
              Create or edit official notices with documents and validity periods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading *</Label>
                <Input
                  id="heading"
                  placeholder="Notice heading"
                  value={formData.heading}
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date *</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading *</Label>
              <Textarea
                id="subheading"
                placeholder="Notice subheading or brief description"
                rows={2}
                value={formData.subheading}
                onChange={(e) => setFormData({...formData, subheading: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until *</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Document (optional)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                />
                <Label htmlFor="isActive">Active Notice</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                />
                <Label htmlFor="featured">Featured Notice</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveNotice}
                disabled={!formData.heading || !formData.subheading || !formData.validUntil}
              >
                {editingNotice ? 'Update' : 'Create'} Notice
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notices List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notices ({notices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : notices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notices found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium truncate">{notice.heading}</h4>
                      <Badge variant={notice.isActive ? 'default' : 'secondary'}>
                        {notice.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {notice.featured && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Featured
                        </Badge>
                      )}
                      {new Date(notice.validUntil) < new Date() && (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notice.subheading}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Published: {new Date(notice.publishedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Valid until: {new Date(notice.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {notice.documentUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(notice.documentUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant={notice.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(notice._id)}
                      className={notice.featured ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                      title={notice.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      ⭐
                    </Button>
                    
                    <Button
                      variant={notice.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(notice._id)}
                    >
                      {notice.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(notice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNotice(notice._id)}
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