"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Info, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/components/language-provider"

export default function DutyCalculatorPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    hsCode: "",
    cif: "",
    origin: "",
    category: "",
  })
  const [result, setResult] = useState<any>(null)

  const calculateDuty = () => {
    const cif = Number.parseFloat(formData.cif) || 0
    const basicDuty = cif * 0.1 // 10% basic duty (example)
    const socialWelfareSurcharge = basicDuty * 0.1 // 10% SWS
    const igst = (cif + basicDuty + socialWelfareSurcharge) * 0.18 // 18% IGST
    const total = cif + basicDuty + socialWelfareSurcharge + igst

    setResult({
      cif,
      basicDuty,
      socialWelfareSurcharge,
      igst,
      total,
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("duty.calculator")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("duty.calculator.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  {t("import.details")}
                </CardTitle>
                <CardDescription>{t("import.details.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hsCode">{t("hs.code")}</Label>
                  <Input
                    id="hsCode"
                    placeholder="e.g., 8517.12.00"
                    value={formData.hsCode}
                    onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cif">{t("cif.value")}</Label>
                  <Input
                    id="cif"
                    type="number"
                    placeholder="Enter CIF value in INR"
                    value={formData.cif}
                    onChange={(e) => setFormData({ ...formData, cif: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="origin">{t("country.origin")}</Label>
                  <Select
                    value={formData.origin}
                    onValueChange={(value) => setFormData({ ...formData, origin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t("import.category")}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="capital">Capital Goods</SelectItem>
                      <SelectItem value="raw">Raw Materials</SelectItem>
                      <SelectItem value="consumer">Consumer Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateDuty} className="w-full" size="lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  {t("calculate.duty")}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>{t("calculation.result")}</CardTitle>
                <CardDescription>{t("breakdown.duties")}</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>CIF Value:</span>
                        <span className="font-medium">₹{result.cif.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("basic.customs.duty")} (10%):</span>
                        <span className="font-medium">₹{result.basicDuty.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("social.welfare.surcharge")} (10%):</span>
                        <span className="font-medium">₹{result.socialWelfareSurcharge.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IGST (18%):</span>
                        <span className="font-medium">₹{result.igst.toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>{t("total.landed.cost")}:</span>
                        <span className="text-primary">₹{result.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        {t("download.calculation")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{t("import.details.desc")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                {t("important.notes")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge variant="secondary">{t("disclaimer")}</Badge>
                  <p className="text-sm text-muted-foreground">{t("calculator.disclaimer")}</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">{t("updates")}</Badge>
                  <p className="text-sm text-muted-foreground">{t("duty.rates.updated")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
