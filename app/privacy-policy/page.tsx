import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">
                Your privacy and data protection are important to us
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      This Privacy Policy describes how Pune Customs Commissionerate ("we," "our," or "us") 
                      collects, uses, and protects your personal information when you use our official website 
                      and related services.
                    </p>
                    <p className="text-muted-foreground">
                      We are committed to protecting your privacy and ensuring the security of your personal 
                      information in accordance with applicable Indian laws and regulations.
                    </p>
                  </CardContent>
                </Card>

                {/* Information We Collect */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Name, address, and contact information</li>
                        <li>Importer/Exporter Code (IEC) and related business details</li>
                        <li>Customs declaration and transaction data</li>
                        <li>Government identification numbers (PAN, Aadhaar, etc.)</li>
                        <li>Bank account and financial information for duty payments</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Technical Information</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* How We Use Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      How We Use Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Process customs declarations and applications</li>
                      <li>Verify importer/exporter credentials and compliance</li>
                      <li>Calculate and collect customs duties and taxes</li>
                      <li>Maintain records as required by law</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Improve our website and services</li>
                      <li>Comply with legal and regulatory requirements</li>
                      <li>Prevent fraud and ensure security</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Protection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Data Protection and Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Encryption of sensitive data during transmission and storage</li>
                      <li>Regular security audits and assessments</li>
                      <li>Access controls and authentication mechanisms</li>
                      <li>Secure data centers with physical security measures</li>
                      <li>Regular staff training on data protection practices</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Sharing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Information Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We may share your information with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Other government departments and agencies as required by law</li>
                      <li>Authorized customs brokers and agents</li>
                      <li>Financial institutions for payment processing</li>
                      <li>Law enforcement agencies when legally required</li>
                      <li>Third-party service providers under strict confidentiality agreements</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Your Rights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Your Rights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Access your personal information held by us</li>
                      <li>Request correction of inaccurate or incomplete data</li>
                      <li>Request deletion of your personal information (subject to legal requirements)</li>
                      <li>Object to processing of your personal information</li>
                      <li>Data portability in certain circumstances</li>
                      <li>Lodge a complaint with the appropriate supervisory authority</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about this Privacy Policy or wish to exercise your rights, 
                      please contact us:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p><strong>Pune Customs Commissionerate</strong></p>
                      <p>Department of Revenue, Ministry of Finance</p>
                      <p>Government of India</p>
                      <p>Email: privacy@punecustoms.gov.in</p>
                      <p>Phone: +91-20-XXXX-XXXX</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Policy Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. Any changes will be posted on 
                      this page with an updated revision date. We encourage you to review this policy 
                      periodically for any changes.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      <strong>Last updated:</strong> {new Date().toLocaleDateString("en-IN")}
                    </p>
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
