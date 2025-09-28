import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Users, Target, Eye, Award } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function AboutPage() {
  const { t } = useTranslation()
  const keyOfficials = [
    {
      name: "Shri Rajesh Kumar",
      designation: t("commissioner.customs"),
      email: "commissioner@punecustoms.gov.in",
    },
    {
      name: "Smt. Priya Sharma",
      designation: t("additional.commissioner"),
      email: "addl.commissioner@punecustoms.gov.in",
    },
    {
      name: "Shri Amit Patel",
      designation: t("deputy.commissioner.import"),
      email: "dc.import@punecustoms.gov.in",
    },
    {
      name: "Smt. Meera Joshi",
      designation: t("deputy.commissioner.export"),
      email: "dc.export@punecustoms.gov.in",
    },
  ]

  const jurisdictionAreas = [
    "Pune City and Pune Rural District",
    "Ahmednagar District",
    "Solapur District",
    "Satara District",
    "Sangli District",
    "Kolhapur District",
  ]

  const services = [
    t("import.export.forms"),
    t("track.application"),
    t("customs.brokers"),
    t("tariff.information"),
    t("duty.calculator"),
    t("vessel.search"),
    t("customs.brokers"),
    t("import.export.forms"),
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t("about.title")}</h1>
              <p className="text-xl text-muted-foreground">
                {t("about.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{t("our.mission")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t("mission.desc")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{t("our.vision")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t("vision.desc")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{t("our.values")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t("values.desc")}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Organizational Details */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Organizational Structure</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Pune Customs operates under the Central Board of Indirect Taxes and Customs (CBIC), Ministry of
                  Finance, Government of India
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Jurisdiction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Jurisdiction Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jurisdictionAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      {t("key.services")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Key Officials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">{t("key.officials")}</h2>
                <p className="text-muted-foreground">{t("about.subtitle")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyOfficials.map((official, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{official.name}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {official.designation}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{official.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our History</h2>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Pune Customs Office was established in 1997 as part of the expansion of customs infrastructure
                      to support the growing industrial and commercial activities in Western Maharashtra. Since its
                      inception, the office has played a crucial role in facilitating international trade while ensuring
                      compliance with customs regulations.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Over the years, Pune Customs has evolved to meet the changing needs of the business community,
                      implementing modern technology and streamlined processes to enhance efficiency and transparency.
                      The office has been at the forefront of various trade facilitation initiatives, including the
                      implementation of electronic systems and risk-based clearance procedures.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, Pune Customs continues to serve as a vital gateway for international trade in the region,
                      supporting thousands of importers, exporters, and other stakeholders in their business operations
                      while maintaining the highest standards of integrity and professionalism.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
