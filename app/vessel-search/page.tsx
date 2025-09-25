"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Ship, Search, Calendar, MapPin, Clock, Anchor } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function VesselSearchPage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const mockVessels = [
    {
      id: 1,
      name: "MSC MEDITERRANEAN",
      imo: "9778234",
      flag: "Panama",
      arrival: "2024-01-20 14:30",
      departure: "2024-01-22 08:00",
      berth: "Berth 12",
      status: "Arrived",
      agent: "Maersk Line India",
    },
    {
      id: 2,
      name: "COSCO SHIPPING UNIVERSE",
      imo: "9795432",
      flag: "Hong Kong",
      arrival: "2024-01-21 09:15",
      departure: "2024-01-23 16:30",
      berth: "Berth 8",
      status: "Expected",
      agent: "COSCO Shipping Lines",
    },
    {
      id: 3,
      name: "EVER GIVEN",
      imo: "9811000",
      flag: "Panama",
      arrival: "2024-01-19 11:45",
      departure: "2024-01-21 14:20",
      berth: "Berth 15",
      status: "Departed",
      agent: "Evergreen Marine",
    },
  ]

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = mockVessels.filter(
        (vessel) =>
          vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vessel.imo.includes(searchTerm) ||
          vessel.agent.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults(mockVessels)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Arrived":
        return "default"
      case "Expected":
        return "secondary"
      case "Departed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("vessel.search")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("vessel.search.subtitle")}</p>
          </div>

          <Card className="mb-8 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                {t("search.vessels")}
              </CardTitle>
              <CardDescription>{t("search.vessels.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">
                    {t("search.vessels")}
                  </Label>
                  <Input
                    id="search"
                    placeholder="Enter vessel name, IMO number, or agent..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  {t("search")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {searchResults.length > 0 ? (
              searchResults.map((vessel) => (
                <Card key={vessel.id} className="hover-lift govt-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Ship className="h-5 w-5 text-primary" />
                          {vessel.name}
                        </CardTitle>
                        <CardDescription>
                          IMO: {vessel.imo} • Flag: {vessel.flag}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(vessel.status)}>{vessel.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">{t("arrival")}:</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          {new Date(vessel.arrival).toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">{t("departure")}:</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          {new Date(vessel.departure).toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Anchor className="h-4 w-4 text-primary" />
                          <span className="font-medium">{t("berth")}:</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{vessel.berth}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{t("shipping.agent")}:</span>
                        <span className="text-muted-foreground">{vessel.agent}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : searchTerm ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Ship className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">{t("no.vessels.found")}</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">{t("enter.search.terms")}</p>
                  <Button onClick={() => setSearchResults(mockVessels)} variant="outline" className="mt-4">
                    {t("show.all.vessels")}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t("port.information")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">24</div>
                  <div className="text-sm text-muted-foreground">{t("active.berths")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">156</div>
                  <div className="text-sm text-muted-foreground">{t("vessels.this.month")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">{t("currently.docked")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
