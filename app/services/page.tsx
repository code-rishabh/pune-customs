import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building,
  Truck,
  Shield,
  Globe,
  Calculator,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Import Clearance",
      description: "Complete import clearance services for all types of goods",
      icon: Truck,
      features: ["Document verification", "Duty assessment", "Physical examination", "Release order"],
      processingTime: "2-5 working days",
      status: "Available",
    },
    {
      title: "Export Clearance",
      description: "Export documentation and clearance services",
      icon: Globe,
      features: ["Export documentation", "Compliance check", "Shipping bill processing", "Let Export Order"],
      processingTime: "1-3 working days",
      status: "Available",
    },
    {
      title: "AEO Certification",
      description: "Authorized Economic Operator certification services",
      icon: Shield,
      features: ["Application processing", "Site verification", "Compliance audit", "Certificate issuance"],
      processingTime: "30-45 working days",
      status: "Available",
    },
    {
      title: "Customs Broker License",
      description: "Licensing services for customs brokers",
      icon: Users,
      features: ["License application", "Renewal services", "Compliance monitoring", "Training certification"],
      processingTime: "15-20 working days",
      status: "Available",
    },
    {
      title: "Warehousing Services",
      description: "Bonded warehouse and storage facilities",
      icon: Building,
      features: ["Warehouse licensing", "Inventory management", "Storage facilities", "Security services"],
      processingTime: "Ongoing",
      status: "Available",
    },
    {
      title: "Duty Calculation",
      description: "Customs duty assessment and calculation services",
      icon: Calculator,
      features: ["Tariff classification", "Valuation services", "Duty computation", "Refund processing"],
      processingTime: "Same day",
      status: "Available",
    },
  ]

  const forms = [
    {
      title: "Import Declaration Form",
      description: "Form for declaring imported goods",
      fileSize: "245 KB",
      format: "PDF",
      lastUpdated: "2024-01-15",
    },
    {
      title: "Export Declaration Form",
      description: "Form for declaring exported goods",
      fileSize: "198 KB",
      format: "PDF",
      lastUpdated: "2024-01-15",
    },
    {
      title: "AEO Application Form",
      description: "Application form for AEO certification",
      fileSize: "512 KB",
      format: "PDF",
      lastUpdated: "2024-01-10",
    },
    {
      title: "Customs Broker License Application",
      description: "Application form for customs broker license",
      fileSize: "324 KB",
      format: "PDF",
      lastUpdated: "2024-01-10",
    },
    {
      title: "Warehouse License Application",
      description: "Application form for warehouse licensing",
      fileSize: "456 KB",
      format: "PDF",
      lastUpdated: "2024-01-08",
    },
    {
      title: "Duty Refund Application",
      description: "Form for claiming duty refunds",
      fileSize: "287 KB",
      format: "PDF",
      lastUpdated: "2024-01-08",
    },
  ]

  const procedures = [
    {
      title: "Import Procedure",
      steps: [
        "Submit import documents",
        "Pay applicable duties and taxes",
        "Physical examination (if required)",
        "Obtain release order",
        "Clear goods from customs area",
      ],
    },
    {
      title: "Export Procedure",
      steps: [
        "Submit shipping bill",
        "Document verification",
        "Physical examination (if required)",
        "Obtain Let Export Order",
        "Ship goods within validity period",
      ],
    },
    {
      title: "AEO Application Process",
      steps: [
        "Submit online application",
        "Pay application fee",
        "Site verification by customs",
        "Compliance audit",
        "Certificate issuance",
      ],
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
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Services & Forms</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive customs services and downloadable forms for all your import/export needs
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide comprehensive customs services to facilitate your international trade operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {service.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Processing Time: {service.processingTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Download Forms</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Download the latest forms and applications for various customs services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2">{form.title}</CardTitle>
                        <CardDescription>{form.description}</CardDescription>
                      </div>
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Format: {form.format}</span>
                        <span>Size: {form.fileSize}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last updated: {new Date(form.lastUpdated).toLocaleDateString("en-IN")}
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Form
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Procedures Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Step-by-Step Procedures</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these detailed procedures to complete your customs processes efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {procedures.map((procedure, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{procedure.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {procedure.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Our team is here to assist you with any questions about our services or procedures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Contact Support
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/faqs">
                    <FileText className="mr-2 h-5 w-5" />
                    View FAQ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
