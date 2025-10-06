"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Briefcase, 
  Newspaper, 
  Image, 
  Trophy, 
  Users, 
  Eye,
  TrendingUp,
  Calendar
} from "lucide-react"

interface DashboardStats {
  notices: { total: number; active: number }
  tenders: { total: number; active: number }
  news: { total: number; active: number }
  sliders: { total: number; active: number }
  visitors: { total: number; today: number }
}

interface VisitorStat {
  date: Date
  count: number
}

interface RecentActivity {
  notices: Array<{ _id: string; heading: string; createdAt: string; isActive: boolean }>
  tenders: Array<{ _id: string; heading: string; createdAt: string; isActive: boolean }>
  news: Array<{ _id: string; text: string; createdAt: string; isActive: boolean }>
}

export default function DashboardTab() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [visitorStats, setVisitorStats] = useState<VisitorStat[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      
      if (response.ok) {
        setStats(data.data.stats)
        setVisitorStats(data.data.visitorStats)
        setRecentActivity(data.data.recentActivity)
      } else {
        console.error('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  const statsCards = [
    {
      title: "Notices",
      icon: FileText,
      total: stats?.notices.total || 0,
      active: stats?.notices.active || 0,
      color: "text-blue-600"
    },
    {
      title: "Tenders", 
      icon: Briefcase,
      total: stats?.tenders.total || 0,
      active: stats?.tenders.active || 0,
      color: "text-green-600"
    },
    {
      title: "News",
      icon: Newspaper,
      total: stats?.news.total || 0,
      active: stats?.news.active || 0,
      color: "text-purple-600"
    },
    {
      title: "Sliders",
      icon: Image,
      total: stats?.sliders.total || 0,
      active: stats?.sliders.active || 0,
      color: "text-orange-600"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground">Overview of your content management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card) => {
          const IconComponent = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.total}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {card.active} Active
                  </Badge>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Visitor Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.visitors.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              All time unique visitors
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.visitors.today || 0}</div>
            <p className="text-xs text-muted-foreground">
              Unique visitors today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Visitor Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {visitorStats.length > 0 ? (
            <div className="space-y-2">
              {visitorStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="text-sm">
                    {new Date(stat.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: `${Math.max(10, (stat.count / Math.max(...visitorStats.map(s => s.count))) * 100)}px` }}
                    ></div>
                    <span className="text-sm font-medium w-8 text-right">{stat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No visitor data available</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest content updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recent Notices */}
            {recentActivity?.notices && recentActivity.notices.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Notices</h4>
                <div className="space-y-2">
                  {recentActivity.notices.map((notice) => (
                    <div key={notice._id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notice.heading}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={notice.isActive ? "default" : "secondary"}>
                        {notice.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Tenders */}
            {recentActivity?.tenders && recentActivity.tenders.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Tenders</h4>
                <div className="space-y-2">
                  {recentActivity.tenders.map((tender) => (
                    <div key={tender._id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{tender.heading}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tender.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={tender.isActive ? "default" : "secondary"}>
                        {tender.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent News */}
            {recentActivity?.news && recentActivity.news.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent News</h4>
                <div className="space-y-2">
                  {recentActivity.news.map((newsItem) => (
                    <div key={newsItem._id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{newsItem.text.substring(0, 50)}...</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(newsItem.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={newsItem.isActive ? "default" : "secondary"}>
                        {newsItem.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}