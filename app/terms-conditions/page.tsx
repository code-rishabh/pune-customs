import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, AlertTriangle, FileText, Shield, Users, Clock } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Terms & Conditions</h1>
              <p className="text-xl text-muted-foreground">
                Please read these terms carefully before using our services
              </p>
            </div>
          </div>
        </section>

        {/* Terms & Conditions Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      These Terms and Conditions ("Terms") govern your use of the Pune Customs Commissionerate 
                      website and related services. By accessing or using our services, you agree to be bound 
                      by these Terms.
                    </p>
                    <p className="text-muted-foreground">
                      These Terms are in addition to and not in substitution of any applicable laws, rules, 
                      regulations, or circulars issued by the Government of India or the Central Board of 
                      Indirect Taxes and Customs (CBIC).
                    </p>
                  </CardContent>
                </Card>

                {/* Acceptance of Terms */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Acceptance of Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      By using this website, you acknowledge that you have read, understood, and agree to be 
                      bound by these Terms. If you do not agree to these Terms, please do not use our services.
                    </p>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these Terms at any time without prior notice. Your 
                      continued use of the website after such modifications constitutes acceptance of the 
                      updated Terms.
                    </p>
                  </CardContent>
                </Card>

                {/* Use of Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Use of Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Permitted Use</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Access information about customs procedures and regulations</li>
                        <li>Submit customs declarations and applications online</li>
                        <li>Track the status of your applications and declarations</li>
                        <li>Download forms and documents</li>
                        <li>Access public notices and circulars</li>
                        <li>Use duty calculation tools and services</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Prohibited Use</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Use the website for any unlawful purpose</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with the proper functioning of the website</li>
                        <li>Submit false or misleading information</li>
                        <li>Violate any applicable laws or regulations</li>
                        <li>Use automated systems to access the website without permission</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* User Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      User Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Provide accurate and complete information in all applications and declarations</li>
                      <li>Maintain the confidentiality of your login credentials</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                      <li>Comply with all applicable customs laws and regulations</li>
                      <li>Keep your contact information up to date</li>
                      <li>Pay all applicable duties, taxes, and fees in a timely manner</li>
                      <li>Retain all relevant documents and records as required by law</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Customs Regulations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Customs Regulations and Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All users must comply with the Customs Act, 1962, and related rules and regulations. 
                      This includes but is not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Proper classification of goods under the Harmonized System of Nomenclature (HSN)</li>
                      <li>Accurate valuation of goods as per Customs Valuation Rules</li>
                      <li>Compliance with import/export licensing requirements</li>
                      <li>Adherence to prohibited and restricted goods lists</li>
                      <li>Proper documentation and record-keeping requirements</li>
                      <li>Timely payment of duties and taxes</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Limitation of Liability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Limitation of Liability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      While we strive to provide accurate and up-to-date information, we make no warranties 
                      or representations regarding the completeness, accuracy, or reliability of the information 
                      on this website.
                    </p>
                    <p className="text-muted-foreground">
                      We shall not be liable for any direct, indirect, incidental, special, or consequential 
                      damages arising from your use of this website or any services provided through it.
                    </p>
                    <p className="text-muted-foreground">
                      The information provided on this website is for general guidance only and should not be 
                      considered as legal advice. Users are advised to consult with qualified professionals 
                      for specific customs-related matters.
                    </p>
                  </CardContent>
                </Card>

                {/* Intellectual Property */}
                <Card>
                  <CardHeader>
                    <CardTitle>Intellectual Property Rights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All content on this website, including text, graphics, logos, images, and software, 
                      is the property of the Government of India and is protected by copyright and other 
                      intellectual property laws.
                    </p>
                    <p className="text-muted-foreground">
                      You may not reproduce, distribute, modify, or create derivative works from any content 
                      on this website without prior written permission from the appropriate authorities.
                    </p>
                  </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your privacy is important to us. Please review our Privacy Policy to understand how 
                      we collect, use, and protect your personal information.
                    </p>
                  </CardContent>
                </Card>

                {/* Termination */}
                <Card>
                  <CardHeader>
                    <CardTitle>Termination</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We reserve the right to terminate or suspend your access to our services at any time, 
                      without notice, for any reason, including violation of these Terms.
                    </p>
                    <p className="text-muted-foreground">
                      Upon termination, your right to use the services will cease immediately, and you must 
                      cease all use of the website and services.
                    </p>
                  </CardContent>
                </Card>

                {/* Governing Law */}
                <Card>
                  <CardHeader>
                    <CardTitle>Governing Law and Jurisdiction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      These Terms shall be governed by and construed in accordance with the laws of India. 
                      Any disputes arising from these Terms or your use of our services shall be subject to 
                      the exclusive jurisdiction of the courts in Pune, Maharashtra.
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      If you have any questions about these Terms and Conditions, please contact us:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p><strong>Pune Customs Commissionerate</strong></p>
                      <p>Department of Revenue, Ministry of Finance</p>
                      <p>Government of India</p>
                      <p>Email: legal@punecustoms.gov.in</p>
                      <p>Phone: +91-20-XXXX-XXXX</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Effective Date */}
                <Card>
                  <CardHeader>
                    <CardTitle>Effective Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      These Terms and Conditions are effective as of {new Date().toLocaleDateString("en-IN")} 
                      and will remain in effect until modified or terminated.
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
