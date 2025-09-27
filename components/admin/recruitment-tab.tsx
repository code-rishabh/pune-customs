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
  Plus, Search, Edit, Trash2, Users, 
  Calendar, Clock, Download, Power, PowerOff 
} from "lucide-react"
import { toast } from "sonner"

interface Recruitment {
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

export default function RecruitmentTab() {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRecruitment, setEditingRecruitment] = useState<Recruitment | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    publishedDate: new Date().toISOString().split('T')[0],
    validUntil: "",
    file: null as File | null,
    isActive: true
  })

  // Fetch recruitments
  const fetchRecruitments = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/recruitments?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setRecruitments(data.recruitments || [])
      } else {
        toast.error(data.error || 'Failed to fetch recruitments')
      }
    } catch (error) {
      toast.error('Failed to fetch recruitments')
    } finally {
      setLoading(false)
    }
  }

  // Save recruitment (create or update)
  const saveRecruitment = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('subheading', formData.subheading)
    formDataToSend.append('publishedDate', formData.publishedDate)
    formDataToSend.append('validUntil', formData.validUntil)
    formDataToSend.append('isActive', formData.isActive.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingRecruitment ? `/api/recruitments/${editingRecruitment._id}` : '/api/recruitments'
      const method = editingRecruitment ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchRecruitments()
      } else {
        toast.error(data.error || 'Failed to save recruitment')
      }
    } catch (error) {
      toast.error('Failed to save recruitment')
    }
  }

  // Delete recruitment
  const deleteRecruitment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recruitment?')) return
    
    try {
      const response = await fetch(`/api/recruitments/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchRecruitments()
      } else {
        toast.error(data.error || 'Failed to delete recruitment')
      }
    } catch (error) {
      toast.error('Failed to delete recruitment')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/recruitments/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchRecruitments()
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
      subheading: "",
      publishedDate: new Date().toISOString().split('T')[0],
      validUntil: "",
      file: null,
      isActive: true
    })
    setShowAddForm(false)
    setEditingRecruitment(null)
  }

  const startEdit = (recruitment: Recruitment) => {
    setEditingRecruitment(recruitment)
    setFormData({
      heading: recruitment.heading,
      subheading: recruitment.subheading,
      publishedDate: recruitment.publishedDate.split('T')[0],
      validUntil: recruitment.validUntil.split('T')[0],
      file: null,
      isActive: recruitment.isActive
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchRecruitments()
  }, [])

  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setFilterActive(filter)
    const activeFilter = filter === 'all' ? undefined : filter === 'active'
    fetchRecruitments(searchQuery, activeFilter)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Recruitment Management</h2>
          <p className="text-muted-foreground">Manage job postings and recruitment announcements</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Recruitment
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search recruitments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => fetchRecruitments(searchQuery, filterActive === 'all' ? undefined : filterActive === 'active')}
        >
          Search
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("")
            setFilterActive('all')
            fetchRecruitments()
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
            {filter === 'all' ? 'All Recruitments' : `${filter} Only`}
          </Button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingRecruitment ? 'Edit' : 'Add New'} Recruitment</CardTitle>
            <CardDescription>
              Create or edit recruitment postings with job details and application deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Job Title/Position *</Label>
                <Input
                  id="heading"
                  placeholder="e.g., Assistant Commissioner, Clerk, Officer"
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
              <Label htmlFor="subheading">Job Description *</Label>
              <Textarea
                id="subheading"
                placeholder="Brief description of the position, requirements, qualifications, etc."
                rows={3}
                value={formData.subheading}
                onChange={(e) => setFormData({...formData, subheading: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Application Deadline *</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Job Advertisement/Details Document (optional)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="isActive">Active Recruitment</Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveRecruitment}
                disabled={!formData.heading || !formData.subheading || !formData.validUntil}
              >
                {editingRecruitment ? 'Update' : 'Create'} Recruitment
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recruitments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recruitments ({recruitments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : recruitments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recruitments found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {recruitments.map((recruitment) => (
                <div key={recruitment._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium truncate">{recruitment.heading}</h4>
                      <Badge variant={recruitment.isActive ? 'default' : 'secondary'}>
                        {recruitment.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {new Date(recruitment.validUntil) < new Date() && (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {recruitment.subheading}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Published: {new Date(recruitment.publishedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Deadline: {new Date(recruitment.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {recruitment.documentUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(recruitment.documentUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant={recruitment.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(recruitment._id)}
                    >
                      {recruitment.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(recruitment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRecruitment(recruitment._id)}
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