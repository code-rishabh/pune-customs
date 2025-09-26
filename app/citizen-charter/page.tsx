import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Shield, Award, Phone, Mail, AlertCircle, CheckCircle, FileText, Download } from "lucide-react"

export default function CitizenCharterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Citizen Charter</h1>
              <p className="text-xl text-muted-foreground">
                Our commitment to excellence in customs services
              </p>
            </div>
          </div>
        </section>

        {/* Citizen Charter Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      The Citizen Charter of Pune Customs Commissionerate is a commitment to provide 
                      efficient, transparent, and citizen-friendly customs services. This charter 
                      outlines our service standards, commitments, and the rights of citizens.
                    </p>
                    <p className="text-muted-foreground">
                      We are committed to delivering customs services with the highest standards of 
                      integrity, professionalism, and efficiency while ensuring compliance with 
                      all applicable laws and regulations.
                    </p>
                  </CardContent>
                </Card>

                {/* Our Vision and Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Our Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To be a world-class customs administration that facilitates legitimate trade 
                        while ensuring national security and revenue collection through efficient, 
                        transparent, and technology-driven processes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Our Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To provide efficient, transparent, and citizen-friendly customs services 
                        while ensuring compliance with laws, preventing smuggling, and facilitating 
                        legitimate international trade.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Service Standards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Service Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Time Standards</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Bill of Entry Processing</span>
                          <span className="text-primary font-semibold">24 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Shipping Bill Processing</span>
                          <span className="text-primary font-semibold">24 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Refund Processing</span>
                          <span className="text-primary font-semibold">30 days</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">Grievance Redressal</span>
                          <span className="text-primary font-semibold">15 days</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">RTI Response</span>
                          <span className="text-primary font-semibold">30 days</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Quality Standards</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Professional and courteous service delivery</li>
                        <li>Transparent and fair assessment procedures</li>
                        <li>Accurate and timely information provision</li>
                        <li>Efficient use of technology and automation</li>
                        <li>Regular training and capacity building of staff</li>
                        <li>Continuous improvement in service delivery</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Offered */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Services Offered
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Import Services</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                          <li>Bill of Entry processing</li>
                          <li>Customs clearance</li>
                          <li>Duty assessment and collection</li>
                          <li>Examination and inspection</li>
                          <li>Bond procedures</li>
                          <li>Refund processing</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Export Services</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                          <li>Shipping Bill processing</li>
                          <li>Export clearance</li>
                          <li>Drawback processing</li>
                          <li>Export promotion schemes</li>
                          <li>Certificate issuance</li>
                          <li>Transit procedures</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rights and Obligations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Your Rights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Right to receive courteous and professional service</li>
                        <li>Right to get accurate and timely information</li>
                        <li>Right to fair and transparent assessment</li>
                        <li>Right to appeal against adverse decisions</li>
                        <li>Right to privacy and confidentiality</li>
                        <li>Right to grievance redressal</li>
                        <li>Right to access public information under RTI</li>
                        <li>Right to participate in public consultations</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Your Obligations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Provide accurate and complete information</li>
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Pay duties and taxes in a timely manner</li>
                        <li>Maintain proper records and documentation</li>
                        <li>Cooperate with customs officers during examination</li>
                        <li>Report any changes in circumstances</li>
                        <li>Respect customs procedures and guidelines</li>
                        <li>Use services responsibly and ethically</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Grievance Redressal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Grievance Redressal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We are committed to addressing your grievances promptly and fairly. If you have 
                      any complaints or suggestions, please contact us through any of the following channels:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Contact Channels</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm">Helpline: +91-20-XXXX-XXXX</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm">grievance@punecustoms.gov.in</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">Online Grievance Portal</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Response Time</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Acknowledgment</span>
                            <span className="text-sm font-medium">24 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Resolution</span>
                            <span className="text-sm font-medium">15 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Appeal</span>
                            <span className="text-sm font-medium">30 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Performance Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We regularly monitor our performance against the following key indicators:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">98%</div>
                        <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <div className="text-sm text-muted-foreground">On-Time Processing</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">99%</div>
                        <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Downloads */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      Downloads
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Citizen Charter (PDF)</h4>
                        <p className="text-sm text-muted-foreground mb-2">Complete citizen charter document</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Service Standards</h4>
                        <p className="text-sm text-muted-foreground mb-2">Detailed service standards and timelines</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Grievance Form</h4>
                        <p className="text-sm text-muted-foreground mb-2">Online grievance submission form</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Feedback Form</h4>
                        <p className="text-sm text-muted-foreground mb-2">Customer feedback and suggestions form</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      For any queries related to our citizen charter or services, please contact:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p><strong>Pune Customs Commissionerate</strong></p>
                      <p>Citizen Services Division</p>
                      <p>Email: citizenservices@punecustoms.gov.in</p>
                      <p>Phone: +91-20-XXXX-XXXX</p>
                      <p>Helpline: +91-20-XXXX-XXXX</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
