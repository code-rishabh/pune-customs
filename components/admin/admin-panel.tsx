"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import AdminHeader from "./admin-header"
import AdminNavigation from "./admin-navigation"
import DashboardTab from "./dashboard-tab"
import NoticesTab from "./notices-tab"
import TendersTab from "./tenders-tab"
import RecruitmentTab from "./recruitment-tab"
import NewsTab from "./news-tab"
import MediaTab from "./media-tab"
import { BarChart3, FileText, Briefcase, Users, Newspaper, Image } from "lucide-react"

export default function AdminPanel() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'notices', label: 'Notices', icon: FileText },
    { id: 'tenders', label: 'Tenders', icon: Briefcase },
    { id: 'recruitment', label: 'Recruitment', icon: Users },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'media', label: 'Media Gallery', icon: Image }
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader userName={session?.user?.name} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-6">
        <AdminNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'notices' && <NoticesTab />}
          {activeTab === 'tenders' && <TendersTab />}
          {activeTab === 'recruitment' && <RecruitmentTab />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'media' && <MediaTab />}
        </div>
      </div>
    </div>
  )
}