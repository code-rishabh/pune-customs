"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Search, Filter, FileText, AlertCircle, Clock, Users } from "lucide-react"
import { getNoticesForHomepage, getTendersForHomepage, getRecruitmentsForHomepage, Notice, Tender, Recruitment } from "@/lib/news"

export default function NoticesPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
  const [activeTab, setActiveTab] = useState("notices")
  
  // Data state
  const [noticesData, setNoticesData] = useState<Notice[]>([])
  const [tendersData, setTendersData] = useState<Tender[]>([])
  const [recruitmentsData, setRecruitmentsData] = useState<Recruitment[]>([])
  const [loading, setLoading] = useState(true)

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["notices", "tenders", "recruitments"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        const [notices, tenders, recruitments] = await Promise.all([
          getNoticesForHomepage(),
          getTendersForHomepage(),
          getRecruitmentsForHomepage()
        ])
        setNoticesData(notices)
        setTendersData(tenders)
        setRecruitmentsData(recruitments)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  // Filter data based on search and filters
  const filteredNotices = noticesData.filter((notice) => {
    const matchesSearch = notice.heading.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || filterType === "notice"
    return matchesSearch && matchesType
  })

  const filteredTenders = tendersData.filter((tender) => {
    const matchesSearch = tender.heading.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || filterType === "tender"
    return matchesSearch && matchesType
  })

  const filteredRecruitments = recruitmentsData.filter((recruitment) => {
    const matchesSearch = recruitment.heading.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || filterType === "recruitment"
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Notices, Tenders & Recruitments</h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with the latest notices, guidelines, tender opportunities, and recruitment announcements from Pune Customs
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notices, tenders and recruitments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="notice">Notices</SelectItem>
                    <SelectItem value="tender">Tenders</SelectItem>
                    <SelectItem value="recruitment">Recruitments</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="w-full md:w-48">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="notices" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  <FileText className="h-4 w-4" />
                  Notices ({filteredNotices.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="tenders" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  Tenders ({filteredTenders.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="recruitments" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  <Users className="h-4 w-4" />
                  Recruitments ({filteredRecruitments.length})
                </TabsTrigger>
              </TabsList>

              {/* Notices Tab */}
              <TabsContent value="notices" className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">Loading notices...</div>
                ) : filteredNotices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No notices found.</div>
                ) : (
                  filteredNotices.map((notice) => (
                    <Card key={notice._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                              <Badge variant="default">Notice</Badge>
                              {notice.featured && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                  Featured
                              </Badge>
                            )}
                            </div>
                            <CardTitle className="text-xl leading-tight mb-2">{notice.heading}</CardTitle>
                            <CardDescription className="text-base">{notice.subheading}</CardDescription>
                          </div>
                          {notice.documentUrl && (
                            <Button asChild className="flex-shrink-0">
                              <a href={notice.documentUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                              </a>
                        </Button>
                          )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                            <span>Published: {new Date(notice.publishedDate).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Valid Until: {new Date(notice.validUntil).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div>
                            <span>Status: {notice.isActive ? "Active" : "Inactive"}</span>
                        </div>
                        <div>
                            <span>Type: Notice</span>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </TabsContent>

              {/* Tenders Tab */}
              <TabsContent value="tenders" className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">Loading tenders...</div>
                ) : filteredTenders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No tenders found.</div>
                ) : (
                  filteredTenders.map((tender) => (
                    <Card key={tender._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="default">Tender</Badge>
                            <Badge
                                variant={tender.isActive ? "secondary" : "destructive"}
                              className="flex items-center gap-1"
                            >
                                {tender.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                            <CardTitle className="text-xl leading-tight mb-2">{tender.heading}</CardTitle>
                          <div className="text-sm text-muted-foreground mb-2">
                              <strong>Tender No:</strong> {tender.tenderNumber}
                          </div>
                        </div>
                          {tender.documentUrl && (
                            <Button asChild className="flex-shrink-0">
                              <a href={tender.documentUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                              </a>
                        </Button>
                          )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Published:</span>
                            <div className="font-medium">{new Date(tender.publishedDate).toLocaleDateString("en-IN")}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Date:</span>
                          <div className="font-medium text-destructive">
                            {new Date(tender.lastDate).toLocaleDateString("en-IN")}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Opening Date:</span>
                          <div className="font-medium">{new Date(tender.openingDate).toLocaleDateString("en-IN")}</div>
                        </div>
                      </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>{tender.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Recruitments Tab */}
              <TabsContent value="recruitments" className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">Loading recruitments...</div>
                ) : filteredRecruitments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No recruitments found.</div>
                ) : (
                  filteredRecruitments.map((recruitment) => (
                    <Card key={recruitment._id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="default">Recruitment</Badge>
                              {recruitment.featured && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl leading-tight mb-2">{recruitment.heading}</CardTitle>
                            <CardDescription className="text-base">{recruitment.subheading}</CardDescription>
                          </div>
                          {recruitment.documentUrl && (
                            <Button asChild className="flex-shrink-0">
                              <a href={recruitment.documentUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Published: {new Date(recruitment.publishedDate).toLocaleDateString("en-IN")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Valid Until: {new Date(recruitment.validUntil).toLocaleDateString("en-IN")}</span>
                          </div>
                          <div>
                            <span>Status: {recruitment.isActive ? "Active" : "Inactive"}</span>
                          </div>
                          <div>
                            <span>Type: Recruitment</span>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
