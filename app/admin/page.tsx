"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Users, BarChart3, Upload, Bell, Loader2, Briefcase } from "lucide-react"
import { getSlidesClient } from "@/lib/slider"
import { toast } from "sonner"

// Import all the modular components
import AdminHeader from "@/components/admin/admin-header"
import DashboardTab from "@/components/admin/dashboard-tab"
import NoticesTab from "@/components/admin/notices-tab"
import TendersTab from "@/components/admin/tenders-tab"
import NewsTab from "@/components/admin/news-tab"
import MediaTab from "@/components/admin/media-tab"
import UsersTab from "@/components/admin/users-tab"
import RecruitmentTab from "@/components/admin/recruitment-tab"

// Interface for admin user
interface AdminUser {
  _id: string
  username: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  
  // Check if current user is admin
  const isAdmin = session?.user?.role === 'admin'
  
  // News state
  const [newsItem, setNewsItem] = useState("")
  const [newsList, setNewsList] = useState<string[]>([])
  
  // Media/Slider state
  const [slideForm, setSlideForm] = useState({ image: "", title: "", description: "" })
  const [slideList, setSlideList] = useState<{ image: string; title: string; description: string }[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [addStatus, setAddStatus] = useState<"idle" | "adding" | "success" | "error">("idle")
  
  // Users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  // Load slides when session is available
  useEffect(() => {
    if (session) {
      getSlidesClient().then((s) => setSlideList(s))
    }
  }, [session])

  // Load users when tab is selected
  useEffect(() => {
    if (activeTab === 'users' && session) {
      fetchUsers()
    }
  }, [activeTab, session])

  // Fetch admin users function
  const fetchUsers = async () => {
    setLoadingUsers(true)
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      if (response.ok) {
        setAdminUsers(data.users)
      } else {
        toast.error(data.error || 'Failed to fetch users')
      }
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoadingUsers(false)
    }
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    router.push("/admin/login")
    return null
  }

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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" })
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader 
        userName={session?.user?.name || session?.user?.username} 
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-7' : 'grid-cols-6'}`}>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="notices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notices
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Tenders
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recruitment
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Media
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab stats={stats} recentNotices={recentNotices} />
          </TabsContent>

          <TabsContent value="notices">
            <NoticesTab />
          </TabsContent>

          <TabsContent value="tenders">
            <TendersTab />
          </TabsContent>

          <TabsContent value="news">
            <NewsTab 
              newsItem={newsItem}
              setNewsItem={setNewsItem}
              newsList={newsList}
              setNewsList={setNewsList}
            />
          </TabsContent>

          <TabsContent value="media">
            <MediaTab 
              slideForm={slideForm}
              setSlideForm={setSlideForm}
              slideList={slideList}
              setSlideList={setSlideList}
              uploadStatus={uploadStatus}
              setUploadStatus={setUploadStatus}
              addStatus={addStatus}
              setAddStatus={setAddStatus}
            />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="users">
              <UsersTab 
                adminUsers={adminUsers}
                loadingUsers={loadingUsers}
                currentUserId={session?.user?.id}
                onRefresh={fetchUsers}
              />
            </TabsContent>
          )}

          <TabsContent value="recruitment">
            <RecruitmentTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
