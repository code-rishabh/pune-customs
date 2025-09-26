"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, FileText, Users, BarChart3, Settings, Upload, Edit, Plus, LogOut, Bell, Image as ImageIcon } from "lucide-react"
import { getNewsItemsClient } from "@/lib/news"
import { getSlidesClient } from "@/lib/slider"
import { trackWebsiteUpdate } from "@/lib/website-update"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Auto-login for development
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newsItem, setNewsItem] = useState("")
  const [newsList, setNewsList] = useState<string[]>([])
  const [slideForm, setSlideForm] = useState({ image: "", title: "", description: "" })
  const [slideList, setSlideList] = useState<{ image: string; title: string; description: string }[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [addStatus, setAddStatus] = useState<"idle" | "adding" | "success" | "error">("idle")

  // Load slides when admin page loads
  useEffect(() => {
    if (isAuthenticated) {
      getSlidesClient().then((s) => setSlideList(s))
    }
  }, [isAuthenticated])

  // Mock data for admin dashboard
  const stats = {
    totalNotices: 45,
    activeTenders: 12,
    pendingApprovals: 8,
    monthlyVisitors: 15420,
  }

  const recentNotices = [
    { id: 1, title: "Import/Export Guidelines Update", status: "Published", date: "2024-01-15" },
    { id: 2, title: "Office Equipment Tender", status: "Draft", date: "2024-01-14" },
    { id: 3, title: "Working Hours Notice", status: "Pending", date: "2024-01-13" },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, this would validate against backend
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use admin/admin123 for demo.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ username: "", password: "" })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
            <CardDescription>Pune Customs Administration Panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Login
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              <strong>Demo Credentials:</strong>
              <br />
              Username: admin
              <br />
              Password: admin123
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold">Pune Customs Admin</h1>
                <p className="text-sm text-muted-foreground">Content Management System</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="notices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notices
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tenders
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Notices</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalNotices}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeTenders}</div>
                  <p className="text-xs text-muted-foreground">3 closing soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.monthlyVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest notices and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotices.map((notice) => (
                    <div key={notice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{notice.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(notice.date).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <Badge
                        variant={
                          notice.status === "Published"
                            ? "default"
                            : notice.status === "Draft"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {notice.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold">Manage Notices</h2>
                <p className="text-muted-foreground">Create and manage public notices and guidelines</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Notice
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Notice</CardTitle>
                <CardDescription>Add a new notice or guideline for publication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notice-title">Title</Label>
                    <Input id="notice-title" placeholder="Enter notice title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notice-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select notice type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notice">Public Notice</SelectItem>
                        <SelectItem value="guideline">Guideline</SelectItem>
                        <SelectItem value="circular">Circular</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notice-description">Description</Label>
                  <Textarea id="notice-description" placeholder="Enter notice description" rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valid-until">Valid Until</Label>
                    <Input id="valid-until" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notice-file">Attach Document</Label>
                  <Input id="notice-file" type="file" accept=".pdf,.doc,.docx" />
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Notice
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tenders Tab */}
          <TabsContent value="tenders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold">Manage Tenders</h2>
                <p className="text-muted-foreground">Create and manage tender notifications</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Tender
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Tender</CardTitle>
                <CardDescription>Add a new tender notification for publication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tender-title">Tender Title</Label>
                    <Input id="tender-title" placeholder="Enter tender title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tender-no">Tender Number</Label>
                    <Input id="tender-no" placeholder="PC/2024/TENDER/XXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tender-description">Description</Label>
                  <Textarea id="tender-description" placeholder="Enter tender description" rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimated-value">Estimated Value (₹)</Label>
                    <Input id="estimated-value" placeholder="0.00" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-date">Last Date for Submission</Label>
                    <Input id="last-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="opening-date">Opening Date</Label>
                    <Input id="opening-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tender-file">Tender Document</Label>
                  <Input id="tender-file" type="file" accept=".pdf,.doc,.docx" />
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Tender
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
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
                  <Input id="news-item" placeholder="Enter news text" value={newsItem} onChange={(e) => setNewsItem(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={async () => {
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
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Ticker
                  </Button>
                  <Button variant="outline" onClick={async () => {
                    const items = await getNewsItemsClient()
                    setNewsList(items)
                  }}>Refresh List</Button>
                </div>
                <div className="space-y-2">
                  <Label>Current Items</Label>
                  <div className="grid gap-2">
                    {newsList.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No items yet. Add the first one above.</p>
                    ) : (
                      newsList.map((it, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm">{it}</span>
                          <Badge variant="secondary">#{i + 1}</Badge>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold">Media Management</h2>
                <p className="text-muted-foreground">Upload and manage photos, videos, and documents</p>
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Photos</CardTitle>
                  <CardDescription>Add photos to the gallery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="file" accept="image/*" multiple />
                  <Input placeholder="Photo title" />
                  <Textarea placeholder="Photo description" rows={3} />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="enforcement">Enforcement</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full">Upload Photos</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Videos</CardTitle>
                  <CardDescription>Add videos to the media section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="file" accept="video/*" />
                  <Input placeholder="Video title" />
                  <Textarea placeholder="Video description" rows={3} />
                  <Input placeholder="Duration (e.g., 5:30)" />
                  <Button className="w-full">Upload Video</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Add documents and reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="file" accept=".pdf,.doc,.docx" />
                  <Input placeholder="Document title" />
                  <Textarea placeholder="Document description" rows={3} />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="statistics">Statistics</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full">Upload Document</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Homepage Slider</CardTitle>
                <CardDescription>Add and preview slides used on homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slide-image">Image URL or /public path</Label>
                    <Input id="slide-image" placeholder="/example.jpg or https://..." value={slideForm.image} onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slide-title">Title</Label>
                    <Input id="slide-title" placeholder="Enter slide title" value={slideForm.title} onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slide-description">Description</Label>
                    <Input id="slide-description" placeholder="Short description" value={slideForm.description} onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slide-file">Or upload from your computer</Label>
                  <Input id="slide-file" type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploadStatus("uploading")
                    const fd = new FormData()
                    fd.append("file", file)
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: fd })
                      if (res.ok) {
                        const data = await res.json()
                        if (data?.path) {
                          // Auto-generate title from filename
                          const filename = data.name || data.path.split('/').pop() || 'uploaded-image'
                          const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
                          setSlideForm((s) => ({ ...s, image: data.path, title }))
                          setUploadStatus("success")
                          setTimeout(() => setUploadStatus("idle"), 2000)
                          // Track website update
                          await trackWebsiteUpdate(`Uploaded image: "${filename}"`, "Admin")
                        }
                      } else {
                        setUploadStatus("error")
                        setTimeout(() => setUploadStatus("idle"), 3000)
                      }
                    } catch {
                      setUploadStatus("error")
                      setTimeout(() => setUploadStatus("idle"), 3000)
                    }
                  }} />
                  {uploadStatus === "uploading" && <p className="text-sm text-blue-600">Uploading...</p>}
                  {uploadStatus === "success" && <p className="text-sm text-green-600">✓ Upload successful!</p>}
                  {uploadStatus === "error" && <p className="text-sm text-red-600">✗ Upload failed. Try again.</p>}
                </div>
                <div className="flex gap-2">
                  <Button 
                    disabled={addStatus === "adding"}
                    onClick={async () => {
                      console.log("Add Slide button clicked!")
                      const payload = { image: slideForm.image.trim(), title: slideForm.title.trim(), description: slideForm.description.trim() }
                      console.log("Payload:", payload)
                      if (!payload.image) {
                        console.log("Missing image")
                        return
                      }
                      setAddStatus("adding")
                      try {
                        console.log("Sending POST to /api/slider")
                        const res = await fetch("/api/slider", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
                        console.log("Response status:", res.status)
                        if (res.ok) {
                          const data = await res.json()
                          console.log("Response data:", data)
                          setSlideForm({ image: "", title: "", description: "" })
                          if (Array.isArray(data.slides)) {
                            console.log("Setting slide list to:", data.slides)
                            setSlideList(data.slides)
                            setAddStatus("success")
                            setTimeout(() => setAddStatus("idle"), 2000)
                            // Track website update
                            await trackWebsiteUpdate(`Added homepage slide: "${payload.title || 'Untitled'}"`, "Admin")
                          }
                        } else {
                          console.log("API error:", res.status)
                          setAddStatus("error")
                          setTimeout(() => setAddStatus("idle"), 3000)
                        }
                      } catch (error) {
                        console.log("Fetch error:", error)
                        setAddStatus("error")
                        setTimeout(() => setAddStatus("idle"), 3000)
                      }
                    }}
                  >
                    {addStatus === "adding" ? "Adding..." : "Add Slide"}
                  </Button>
                  <Button variant="outline" onClick={async () => { const s = await getSlidesClient(); setSlideList(s) }}>Refresh Slides</Button>
                </div>
                {addStatus === "success" && <p className="text-sm text-green-600">✓ Slide added successfully!</p>}
                {addStatus === "error" && <p className="text-sm text-red-600">✗ Failed to add slide. Try again.</p>}
                <div className="grid gap-2">
                  {slideList.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No slides yet. Add the first one above or refresh.</p>
                  ) : (
                    slideList.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="min-w-0">
                          <p className="font-medium truncate">{s.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{s.image}</p>
                        </div>
                        <Badge variant="secondary">#{i + 1}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold">User Management</h2>
                <p className="text-muted-foreground">Manage admin users and their permissions</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>List of users with admin access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Admin User</h4>
                        <p className="text-sm text-muted-foreground">admin@punecustoms.gov.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Super Admin</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Content Manager</h4>
                        <p className="text-sm text-muted-foreground">content@punecustoms.gov.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Editor</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
