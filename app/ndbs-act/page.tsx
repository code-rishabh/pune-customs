import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, FileText, Download, AlertCircle, Clock, Users } from "lucide-react"

export default function NDBSActPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">NDBS Act</h1>
              <p className="text-xl text-muted-foreground">
                Narcotic Drugs and Psychotropic Substances Act, 1985
              </p>
            </div>
          </div>
        </section>

        {/* NDBS Act Content */}
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
                      The Narcotic Drugs and Psychotropic Substances Act, 1985 (NDPS Act) is a comprehensive 
                      legislation that consolidates and amends the law relating to narcotic drugs and psychotropic 
                      substances. The Act provides for the control and regulation of operations relating to 
                      narcotic drugs and psychotropic substances.
                    </p>
                    <p className="text-muted-foreground">
                      As part of customs enforcement, Pune Customs Commissionerate plays a crucial role in 
                      preventing the smuggling of narcotic drugs and psychotropic substances across international 
                      borders.
                    </p>
                  </CardContent>
                </Card>

                {/* Key Provisions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Key Provisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Prohibited Activities</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Production, manufacture, possession, sale, purchase, transport, storage, or consumption of narcotic drugs or psychotropic substances</li>
                        <li>Import or export of narcotic drugs or psychotropic substances without proper authorization</li>
                        <li>Financing of any of the above activities</li>
                        <li>Harboring persons engaged in drug trafficking</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Penalties</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Rigorous imprisonment for a term which shall not be less than 10 years but which may extend to 20 years</li>
                        <li>Fine which shall not be less than one lakh rupees but which may extend to two lakh rupees</li>
                        <li>For subsequent offenses, imprisonment for a term which shall not be less than 15 years but which may extend to 30 years</li>
                        <li>Death penalty for certain aggravated offenses involving commercial quantities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Customs Role */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Role of Customs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Pune Customs Commissionerate is responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Intercepting and seizing narcotic drugs and psychotropic substances at ports and airports</li>
                      <li>Conducting searches and investigations in suspected cases</li>
                      <li>Coordinating with other enforcement agencies like DRI, NCB, and local police</li>
                      <li>Maintaining surveillance on high-risk cargo and passengers</li>
                      <li>Training customs officers in drug detection techniques</li>
                      <li>Maintaining records of seizures and prosecutions</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Detection Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Detection and Prevention
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Detection Techniques</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>X-ray scanning of cargo and baggage</li>
                        <li>Drug detection dogs (K9 units)</li>
                        <li>Chemical analysis and testing</li>
                        <li>Intelligence-based profiling</li>
                        <li>Behavioral analysis of passengers</li>
                        <li>Container inspection and verification</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Prevention Measures</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>Risk profiling of cargo and passengers</li>
                        <li>Coordination with international agencies</li>
                        <li>Regular training and capacity building</li>
                        <li>Use of advanced technology and equipment</li>
                        <li>Public awareness campaigns</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Notices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Important Notices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-sm font-medium text-yellow-800">
                        <strong>Warning:</strong> Any person found in possession of narcotic drugs or psychotropic substances 
                        will be prosecuted under the NDPS Act, 1985.
                      </p>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <p className="text-sm font-medium text-blue-800">
                        <strong>Notice:</strong> Import/Export of any substance listed in the NDPS Act requires 
                        prior permission from the competent authority.
                      </p>
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
                        <h4 className="font-medium mb-2">NDPS Act, 1985 (Full Text)</h4>
                        <p className="text-sm text-muted-foreground mb-2">Complete text of the Narcotic Drugs and Psychotropic Substances Act</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">NDPS Rules, 1985</h4>
                        <p className="text-sm text-muted-foreground mb-2">Rules framed under the NDPS Act</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Amendment Acts</h4>
                        <p className="text-sm text-muted-foreground mb-2">Various amendments to the NDPS Act</p>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">Guidelines for Officers</h4>
                        <p className="text-sm text-muted-foreground mb-2">Operational guidelines for customs officers</p>
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
                      For any queries related to NDPS Act enforcement, please contact:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p><strong>Pune Customs Commissionerate</strong></p>
                      <p>NDPS Enforcement Cell</p>
                      <p>Email: ndps@punecustoms.gov.in</p>
                      <p>Phone: +91-20-XXXX-XXXX</p>
                      <p>Emergency: +91-20-XXXX-XXXX</p>
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
