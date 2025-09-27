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
  Plus, Search, Edit, Trash2, FileText, 
  Calendar, Clock, Download, Power, PowerOff, DollarSign, Hash, Star
} from "lucide-react"
import { toast } from "sonner"

interface Tender {
  _id: string
  heading: string
  description: string
  publishedDate: string
  lastDate: string
  openingDate: string
  estimatedValue: number
  tenderNo: string
  documentUrl?: string
  isActive: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function TendersTab() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTender, setEditingTender] = useState<Tender | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    publishedDate: new Date().toISOString().split('T')[0],
    lastDate: "",
    openingDate: "",
    estimatedValue: "",
    tenderNo: "",
    file: null as File | null,
    isActive: true,
    featured: false
  })

  // Fetch tenders
  const fetchTenders = async (search?: string, active?: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (active !== undefined) params.set('active', active.toString())
      
      const response = await fetch(`/api/tenders?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setTenders(data.tenders || [])
      } else {
        toast.error(data.error || 'Failed to fetch tenders')
      }
    } catch (error) {
      toast.error('Failed to fetch tenders')
    } finally {
      setLoading(false)
    }
  }

  // Save tender
  const saveTender = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('heading', formData.heading)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('publishedDate', formData.publishedDate)
    formDataToSend.append('lastDate', formData.lastDate)
    formDataToSend.append('openingDate', formData.openingDate)
    formDataToSend.append('estimatedValue', formData.estimatedValue)
    formDataToSend.append('tenderNo', formData.tenderNo)
    formDataToSend.append('isActive', formData.isActive.toString())
    formDataToSend.append('featured', formData.featured.toString())
    
    if (formData.file) {
      formDataToSend.append('file', formData.file)
    }

    try {
      const url = editingTender ? `/api/tenders/${editingTender._id}` : '/api/tenders'
      const method = editingTender ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        resetForm()
        fetchTenders()
      } else {
        toast.error(data.error || 'Failed to save tender')
      }
    } catch (error) {
      toast.error('Failed to save tender')
    }
  }

  // Delete tender
  const deleteTender = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tender?')) return
    
    try {
      const response = await fetch(`/api/tenders/${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchTenders()
      } else {
        toast.error(data.error || 'Failed to delete tender')
      }
    } catch (error) {
      toast.error('Failed to delete tender')
    }
  }

  // Toggle active status
  const toggleActive = async (id: string) => {
    try {
      const response = await fetch(`/api/tenders/${id}/toggle-active`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchTenders()
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
      const response = await fetch(`/api/tenders/${id}/toggle-featured`, { method: 'POST' })
      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        fetchTenders()
      } else {
        toast.error(data.error || 'Failed to toggle featured status')
      }
    } catch (error) {
      toast.error('Failed to toggle featured status')
    }
  }

  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
      publishedDate: new Date().toISOString().split('T')[0],
      lastDate: "",
      openingDate: "",
      estimatedValue: "",
      tenderNo: "",
      file: null,
      isActive: true,
      featured: false
    })
    setShowAddForm(false)
    setEditingTender(null)
  }

  const startEdit = (tender: Tender) => {
    setEditingTender(tender)
    setFormData({
      heading: tender.heading,
      description: tender.description,
      publishedDate: tender.publishedDate.split('T')[0],
      lastDate: tender.lastDate.split('T')[0],
      openingDate: tender.openingDate.split('T')[0],
      estimatedValue: tender.estimatedValue.toString(),
      tenderNo: tender.tenderNo,
      file: null,
      isActive: tender.isActive,
      featured: tender.featured
    })
    setShowAddForm(true)
  }

  useEffect(() => {
    fetchTenders()
  }, [])

  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setFilterActive(filter)
    const activeFilter = filter === 'all' ? undefined : filter === 'active'
    fetchTenders(searchQuery, activeFilter)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR' 
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold">Tenders Management</h2>
          <p className="text-muted-foreground">Manage government tenders and procurement</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tender
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search tenders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => fetchTenders(searchQuery, filterActive === 'all' ? undefined : filterActive === 'active')}
        >
          Search
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("")
            setFilterActive('all')
            fetchTenders()
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
            {filter === 'all' ? 'All Tenders' : `${filter} Only`}
          </Button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTender ? 'Edit' : 'Add New'} Tender</CardTitle>
            <CardDescription>
              Create or edit government tender with all required details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Tender Heading *</Label>
                <Input
                  id="heading"
                  placeholder="Tender title"
                  value={formData.heading}
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenderNo">Tender No. *</Label>
                <Input
                  id="tenderNo"
                  placeholder="TND/2024/001"
                  value={formData.tenderNo}
                  onChange={(e) => setFormData({...formData, tenderNo: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Tender description and requirements"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date *</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDate">Last Date *</Label>
                <Input
                  id="lastDate"
                  type="date"
                  value={formData.lastDate}
                  onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openingDate">Opening Date *</Label>
                <Input
                  id="openingDate"
                  type="date"
                  value={formData.openingDate}
                  onChange={(e) => setFormData({...formData, openingDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Estimated Value (₹)</Label>
              <Input
                id="estimatedValue"
                type="number"
                placeholder="0"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Tender Document (optional)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                />
                <Label htmlFor="isActive">Active Tender</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                />
                <Label htmlFor="featured">Featured on Homepage</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={saveTender}
                disabled={!formData.heading || !formData.description || !formData.tenderNo || !formData.lastDate || !formData.openingDate}
              >
                {editingTender ? 'Update' : 'Create'} Tender
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tenders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tenders ({tenders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : tenders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tenders found. Create the first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {tenders.map((tender) => (
                <div key={tender._id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium truncate">{tender.heading}</h4>
                      <Badge variant={tender.isActive ? 'default' : 'secondary'}>
                        {tender.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {tender.featured && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {new Date(tender.lastDate) < new Date() && (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {tender.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        {tender.tenderNo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Last: {new Date(tender.lastDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Opening: {new Date(tender.openingDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {tender.estimatedValue > 0 ? formatCurrency(tender.estimatedValue) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {tender.documentUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(tender.documentUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant={tender.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(tender._id)}
                      className={tender.featured ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant={tender.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(tender._id)}
                    >
                      {tender.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(tender)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTender(tender._id)}
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