"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, User, Building } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function ContactPage() {
  const { t } = useTranslation()

  const contactInfo = [
    {
      title: t("main.office"),
      address: "Pune Customs Office, Department of Revenue, Ministry of Finance, Government of India",
      phone: "+91-20-XXXX-XXXX",
      email: "info@punecustoms.gov.in",
      hours: t("office.hours"),
    },
  ]

  const departments = [
    {
      name: t("import.section"),
      head: "Shri Amit Patel",
      designation: t("deputy.commissioner.import"),
      phone: "+91-20-XXXX-1003",
      email: "dc.import@punecustoms.gov.in",
    },
    {
      name: t("export.section"),
      head: "Smt. Meera Joshi",
      designation: t("deputy.commissioner.export"),
      phone: "+91-20-XXXX-1004",
      email: "dc.export@punecustoms.gov.in",
    },
    {
      name: t("assessment.section"),
      head: "Shri Rajesh Gupta",
      designation: t("additional.commissioner"),
      phone: "+91-20-XXXX-1005",
      email: "aeo@punecustoms.gov.in",
    },
    {
      name: t("enforcement.section"),
      head: "Smt. Priya Sharma",
      designation: t("additional.commissioner"),
      phone: "+91-20-XXXX-1002",
      email: "enforcement@punecustoms.gov.in",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t("contact.title")}</h1>
              <p className="text-xl text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Main Office Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Office Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span>{info.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>{info.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span>{info.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{info.hours}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                    <CardDescription>For urgent matters, contact us directly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Emergency Helpline</div>
                        <div className="text-sm text-muted-foreground">+91-20-XXXX-HELP</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Quick Response</div>
                        <div className="text-sm text-muted-foreground">urgent@punecustoms.gov.in</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Department Contacts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Contact specific departments directly for specialized assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{dept.head}</div>
                          <div className="text-sm text-muted-foreground">{dept.designation}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
