import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Download, Scale, AlertCircle, Clock, Users, Search } from "lucide-react"

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Rules & Regulations</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive guide to customs rules and procedures
              </p>
            </div>
          </div>
        </section>

        {/* Rules Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      The customs rules and regulations form the backbone of India's international trade 
                      framework. These rules are designed to facilitate legitimate trade while ensuring 
                      proper revenue collection and national security.
                    </p>
                    <p className="text-muted-foreground">
                      This section provides comprehensive information about various customs rules, 
                      procedures, and regulations that govern import and export activities in India.
                    </p>
                  </CardContent>
                </Card>

                {/* Major Rules Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        Customs Act, 1962
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        The principal legislation governing customs procedures in India
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Import and export procedures</li>
                        <li>Duty assessment and collection</li>
                        <li>Valuation of goods</li>
                        <li>Classification of goods</li>
                        <li>Appeal and revision procedures</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Customs Rules, 1962
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Detailed rules framed under the Customs Act
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Customs Valuation Rules</li>
                        <li>Customs Tariff Rules</li>
                        <li>Customs (Appeals) Rules</li>
                        <li>Customs (Provisional Duty Assessment) Rules</li>
                        <li>Customs (Compounding of Offences) Rules</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Import-Export Procedures
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Step-by-step procedures for trade activities
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Bill of Entry procedures</li>
                        <li>Shipping Bill procedures</li>
                        <li>Customs clearance process</li>
                        <li>Examination and assessment</li>
                        <li>Out of charge procedures</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Special Procedures
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Specialized procedures for specific cases
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Bond procedures</li>
                        <li>Warehousing procedures</li>
                        <li>Transit procedures</li>
                        <li>Re-export procedures</li>
                        <li>Refund procedures</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Rules and Regulations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Key Rules and Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Customs Valuation Rules, 2007</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        These rules determine the value of imported goods for customs duty purposes.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Transaction value method</li>
                        <li>Identical goods method</li>
                        <li>Similar goods method</li>
                        <li>Deductive value method</li>
                        <li>Computed value method</li>
                        <li>Fallback method</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Customs Tariff Act, 1975</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Provides for the rates of customs duties and classification of goods.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Basic customs duty rates</li>
                        <li>Additional customs duty (CVD)</li>
                        <li>Special additional duty (SAD)</li>
                        <li>Anti-dumping duty</li>
                        <li>Safeguard duty</li>
                        <li>Countervailing duty</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Customs (Appeals) Rules, 1982</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Governs the procedure for filing appeals against customs decisions.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Appeal to Commissioner (Appeals)</li>
                        <li>Appeal to CESTAT</li>
                        <li>Appeal to High Court</li>
                        <li>Appeal to Supreme Court</li>
                        <li>Time limits for appeals</li>
                        <li>Procedure for appeals</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Circulars and Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Important Circulars and Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium">CBIC Circulars</h4>
                        <p className="text-sm text-muted-foreground">
                          Latest circulars issued by the Central Board of Indirect Taxes and Customs
                        </p>
                      </div>
                      <div className="border-l-4 border-accent pl-4">
                        <h4 className="font-medium">Customs Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications regarding duty rates, exemptions, and procedural changes
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary pl-4">
                        <h4 className="font-medium">Trade Notices</h4>
                        <p className="text-sm text-muted-foreground">
                          Important notices for trade and industry stakeholders
                        </p>
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
                        <h4 className="font-medium mb-2">Customs Act, 1962</h4>
                        <p className="text-sm text-muted-foreground mb-2">Complete text of the Customs Act</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Customs Rules, 1962</h4>
                        <p className="text-sm text-muted-foreground mb-2">All customs rules and regulations</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Customs Tariff Act, 1975</h4>
                        <p className="text-sm text-muted-foreground mb-2">Tariff rates and classifications</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Latest Circulars</h4>
                        <p className="text-sm text-muted-foreground mb-2">Recent CBIC circulars and notifications</p>
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
                      For any queries related to customs rules and procedures, please contact:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p><strong>Pune Customs Commissionerate</strong></p>
                      <p>Legal and Rules Section</p>
                      <p>Email: rules@punecustoms.gov.in</p>
                      <p>Phone: +91-20-XXXX-XXXX</p>
                      <p>Fax: +91-20-XXXX-XXXX</p>
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
