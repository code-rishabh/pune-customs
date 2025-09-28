import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Phone, Mail, MapPin, Clock, FileText, CheckCircle } from "lucide-react"

export default function EnforcementDepartmentPage() {
  const keyPersonnel = [
    {
      name: "Shri Ravi Kumar",
      designation: "Deputy Commissioner (Enforcement)",
      email: "dc.enforcement@punecustoms.gov.in",
    },
    {
      name: "Smt. Kavita Sharma",
      designation: "Assistant Commissioner (Enforcement)",
      email: "ac.enforcement@punecustoms.gov.in",
    },
  ]

  const services = [
    "Anti-Smuggling Operations",
    "Intelligence Gathering",
    "Surveillance Activities",
    "Seizure and Confiscation",
    "Investigation of Offenses",
    "Prosecution Support",
    "Border Security Coordination",
    "Risk Assessment and Profiling",
  ]

  const procedures = [
    "Receive intelligence or tip-off",
    "Conduct preliminary investigation",
    "Obtain necessary search warrants",
    "Execute search and seizure operations",
    "Document evidence and prepare reports",
    "Initiate legal proceedings if required",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Enforcement Department</h1>
              <p className="text-xl text-muted-foreground">
                Protecting national interests through vigilant enforcement
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
                      The Enforcement Department is responsible for preventing smuggling, enforcing customs laws, 
                      and protecting national security. Our dedicated team works around the clock to detect and 
                      prevent illegal activities, ensuring compliance with customs regulations and safeguarding 
                      the nation's economic interests.
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
                        <span>24/7 Operations</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>24/7 Operations</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>24/7 Operations</span>
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
                  Comprehensive enforcement services to maintain law and order
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

        {/* Enforcement Procedures */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">Enforcement Procedures</h2>
                <p className="text-muted-foreground">
                  Standard operating procedures for enforcement activities
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
                <p className="text-muted-foreground">Meet our enforcement officers</p>
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
                          <p className="text-muted-foreground">+91-20-XXXX-1006</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">enforcement@punecustoms.gov.in</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">Third Floor, Pune Customs Office</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Emergency Hotline</p>
                          <p className="text-muted-foreground">+91-20-XXXX-1999</p>
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
