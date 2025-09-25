"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Package, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function TrackApplicationPage() {
  const { t } = useTranslation()
  const [trackingId, setTrackingId] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)

  const mockTrackingData = {
    id: "PNC2024001234",
    type: "Import License Application",
    status: "Under Review",
    progress: 60,
    submittedDate: "2024-01-15",
    expectedCompletion: "2024-01-25",
    currentStage: "Document Verification",
    stages: [
      { name: "Application Submitted", status: "completed", date: "2024-01-15" },
      { name: "Initial Review", status: "completed", date: "2024-01-16" },
      { name: "Document Verification", status: "current", date: "2024-01-18" },
      { name: "Final Approval", status: "pending", date: null },
      { name: "Certificate Issued", status: "pending", date: null },
    ],
    documents: [
      { name: "Application Form", status: "approved" },
      { name: "Company Registration", status: "approved" },
      { name: "Bank Guarantee", status: "under_review" },
      { name: "Import License", status: "pending" },
    ],
  }

  const handleTrack = () => {
    if (trackingId.trim()) {
      setTrackingResult(mockTrackingData)
    }
  }

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "current":
        return <Clock className="h-5 w-5 text-primary" />
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">{t("approved")}</Badge>
      case "under_review":
        return <Badge variant="secondary">{t("under.review")}</Badge>
      case "pending":
        return <Badge variant="outline">{t("pending")}</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("track.application.title")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("track.application.subtitle")}</p>
          </div>

          <Card className="mb-8 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                {t("track.your.application")}
              </CardTitle>
              <CardDescription>{t("application.reference")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking" className="sr-only">
                    {t("reference.number")}
                  </Label>
                  <Input
                    id="tracking"
                    placeholder="Enter application reference number (e.g., PNC2024001234)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  />
                </div>
                <Button onClick={handleTrack} size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  {t("track")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {trackingResult && (
            <div className="space-y-6">
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        {trackingResult.type}
                      </CardTitle>
                      <CardDescription>Application ID: {trackingResult.id}</CardDescription>
                    </div>
                    <Badge variant="secondary">{trackingResult.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{t("progress")}</span>
                        <span>{trackingResult.progress}%</span>
                      </div>
                      <Progress value={trackingResult.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">{t("submitted.date")}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(trackingResult.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t("expected.completion")}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(trackingResult.expectedCompletion).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>{t("application.stages")}</CardTitle>
                  <CardDescription>
                    {t("current.stage")}: {trackingResult.currentStage}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.stages.map((stage: any, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        {getStageIcon(stage.status)}
                        <div className="flex-1">
                          <p className={`font-medium ${stage.status === "current" ? "text-primary" : ""}`}>
                            {stage.name}
                          </p>
                          {stage.date && (
                            <p className="text-sm text-muted-foreground">{new Date(stage.date).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t("document.status")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trackingResult.documents.map((doc: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{doc.name}</span>
                        {getDocumentStatus(doc.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!trackingResult && trackingId && (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">{t("no.application.found")}</p>
                <p className="text-sm text-muted-foreground mt-2">{t("check.reference.number")}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
