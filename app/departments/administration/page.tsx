import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Phone, Mail, MapPin, Clock, FileText, CheckCircle } from "lucide-react"

export default function AdministrationDepartmentPage() {
  const keyPersonnel = [
    {
      name: "Smt. Sunita Reddy",
      designation: "Deputy Commissioner (Administration)",
      email: "dc.admin@punecustoms.gov.in",
    },
    {
      name: "Shri Rajesh Gupta",
      designation: "Assistant Commissioner (Administration)",
      email: "ac.admin@punecustoms.gov.in",
    },
  ]

  const services = [
    "Human Resources Management",
    "Administrative Support Services",
    "Facility Management",
    "IT Infrastructure Management",
    "Budget and Finance Management",
    "Policy Implementation",
    "Staff Training and Development",
    "General Administration",
  ]

  const procedures = [
    "Submit administrative request or application",
    "Provide required supporting documents",
    "Undergo administrative review process",
    "Receive approval or feedback",
    "Complete necessary formalities",
    "Obtain final clearance or service",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Administration Department</h1>
              <p className="text-xl text-muted-foreground">
                Supporting organizational excellence through efficient administration
              </p>
            </div>
          </div>
        </section>

        {/* Department Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Department Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      The Administration Department provides essential support services to ensure the smooth functioning 
                      of Pune Customs. We handle human resources, facility management, IT infrastructure, and general 
                      administrative functions to support all operational departments and maintain organizational efficiency.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Working Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive administrative support for organizational success
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{service}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Administrative Procedures */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Administrative Procedures</h2>
                <p className="text-muted-foreground">
                  Standard procedures for administrative services
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {procedures.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <Badge variant="outline" className="text-xs mt-1">
                          {index + 1}
                        </Badge>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Personnel */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Key Personnel</h2>
                <p className="text-muted-foreground">Meet our administrative team</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyPersonnel.map((person, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{person.name}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {person.designation}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{person.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+91-20-XXXX-1007</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">admin@punecustoms.gov.in</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">Ground Floor, Pune Customs Office</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Forms & Documents</p>
                          <p className="text-muted-foreground">Available at Reception</p>
                        </div>
                      </div>
                    </div>
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
