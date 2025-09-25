"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, FileText, Users, BarChart3, Settings, Upload, Edit, Plus, LogOut } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")

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
          <TabsList className="grid w-full grid-cols-5">
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
