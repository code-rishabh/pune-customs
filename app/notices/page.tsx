"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Search, Filter, FileText, AlertCircle, Clock } from "lucide-react"

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

  const notices = [
    {
      id: 1,
      title: "Important Notice regarding Import/Export Procedures - Updated Guidelines",
      type: "Notice",
      date: "2024-01-15",
      validUntil: "2024-06-15",
      fileSize: "245 KB",
      format: "PDF",
      urgent: true,
      description:
        "New procedures for customs clearance effective immediately. All importers and exporters must comply.",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Tender for Office Equipment Supply - Computer Systems and Peripherals",
      type: "Tender",
      date: "2024-01-12",
      validUntil: "2024-02-12",
      fileSize: "1.2 MB",
      format: "PDF",
      urgent: false,
      description: "Supply of computer systems, printers, and other office equipment for Pune Customs Office.",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "New Guidelines for Customs Clearance - Digital Documentation",
      type: "Guideline",
      date: "2024-01-10",
      validUntil: "2024-12-31",
      fileSize: "890 KB",
      format: "PDF",
      urgent: false,
      description: "Guidelines for digital submission of customs documents and online processing procedures.",
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "Public Notice - Changes in Working Hours",
      type: "Notice",
      date: "2024-01-08",
      validUntil: "2024-03-31",
      fileSize: "156 KB",
      format: "PDF",
      urgent: false,
      description: "Temporary changes in office working hours during the renovation period.",
      downloadUrl: "#",
    },
    {
      id: 5,
      title: "Tender for Security Services - Annual Contract",
      type: "Tender",
      date: "2024-01-05",
      validUntil: "2024-01-25",
      fileSize: "2.1 MB",
      format: "PDF",
      urgent: true,
      description: "Annual contract for security services at Pune Customs Office premises.",
      downloadUrl: "#",
    },
  ]

  const tenders = [
    {
      id: 1,
      title: "Supply of Office Furniture and Equipment",
      tenderNo: "PC/2024/TENDER/001",
      publishDate: "2024-01-15",
      lastDate: "2024-02-15",
      openingDate: "2024-02-16",
      estimatedValue: "₹15,00,000",
      status: "Active",
      fileSize: "1.5 MB",
      format: "PDF",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Annual Maintenance Contract for IT Equipment",
      tenderNo: "PC/2024/TENDER/002",
      publishDate: "2024-01-10",
      lastDate: "2024-02-10",
      openingDate: "2024-02-11",
      estimatedValue: "₹8,50,000",
      status: "Active",
      fileSize: "980 KB",
      format: "PDF",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Cleaning and Housekeeping Services",
      tenderNo: "PC/2024/TENDER/003",
      publishDate: "2024-01-05",
      lastDate: "2024-01-25",
      openingDate: "2024-01-26",
      estimatedValue: "₹12,00,000",
      status: "Closing Soon",
      fileSize: "1.2 MB",
      format: "PDF",
      downloadUrl: "#",
    },
  ]

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notice.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesType
  })

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Notices & Tenders</h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with the latest notices, guidelines, and tender opportunities from Pune Customs
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
                    placeholder="Search notices and tenders..."
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
                    <SelectItem value="guideline">Guidelines</SelectItem>
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
            <Tabs defaultValue="notices" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="notices" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notices & Guidelines ({filteredNotices.length})
                </TabsTrigger>
                <TabsTrigger value="tenders" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Tenders ({filteredTenders.length})
                </TabsTrigger>
              </TabsList>

              {/* Notices Tab */}
              <TabsContent value="notices" className="space-y-6">
                {filteredNotices.map((notice) => (
                  <Card key={notice.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={notice.type === "Notice" ? "default" : "secondary"}>{notice.type}</Badge>
                            {notice.urgent && (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl leading-tight mb-2">{notice.title}</CardTitle>
                          <CardDescription className="text-base">{notice.description}</CardDescription>
                        </div>
                        <Button className="flex-shrink-0">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Published: {new Date(notice.date).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Valid Until: {new Date(notice.validUntil).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div>
                          <span>Format: {notice.format}</span>
                        </div>
                        <div>
                          <span>Size: {notice.fileSize}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Tenders Tab */}
              <TabsContent value="tenders" className="space-y-6">
                {filteredTenders.map((tender) => (
                  <Card key={tender.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="default">Tender</Badge>
                            <Badge
                              variant={tender.status === "Active" ? "secondary" : "destructive"}
                              className="flex items-center gap-1"
                            >
                              {tender.status === "Closing Soon" && <Clock className="h-3 w-3" />}
                              {tender.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl leading-tight mb-2">{tender.title}</CardTitle>
                          <div className="text-sm text-muted-foreground mb-2">
                            <strong>Tender No:</strong> {tender.tenderNo}
                          </div>
                          <div className="text-lg font-semibold text-primary">
                            Estimated Value: {tender.estimatedValue}
                          </div>
                        </div>
                        <Button className="flex-shrink-0">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Published:</span>
                          <div className="font-medium">{new Date(tender.publishDate).toLocaleDateString("en-IN")}</div>
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
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span>Format: {tender.format}</span>
                        <span>Size: {tender.fileSize}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
