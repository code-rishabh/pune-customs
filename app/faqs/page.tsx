import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, Phone, Mail, FileText, Clock, Users, Scale } from "lucide-react"

export default function FAQsPage() {
  const faqCategories = [
    {
      title: "General Information",
      icon: HelpCircle,
      faqs: [
        {
          question: "What is Pune Customs Commissionerate?",
          answer: "Pune Customs Commissionerate is a government office under the Central Board of Indirect Taxes and Customs (CBIC), responsible for facilitating international trade and ensuring compliance with customs laws in the Pune region."
        },
        {
          question: "What are the office hours?",
          answer: "Our office hours are Monday to Friday: 9:30 AM - 6:00 PM, Saturday: 9:30 AM - 1:00 PM. Emergency services are available 24/7."
        },
        {
          question: "How can I contact Pune Customs?",
          answer: "You can contact us through our helpline at +91-20-XXXX-XXXX, email at info@punecustoms.gov.in, or visit our office at the address provided on the contact page."
        },
        {
          question: "What services does Pune Customs provide?",
          answer: "We provide import/export clearance, duty assessment, refund processing, AEO certification, customs broker registration, and various other trade facilitation services."
        }
      ]
    },
    {
      title: "Import Procedures",
      icon: FileText,
      faqs: [
        {
          question: "What documents are required for import clearance?",
          answer: "Required documents include Bill of Entry, Commercial Invoice, Packing List, Bill of Lading/Airway Bill, Import License (if applicable), and any other documents as per the nature of goods."
        },
        {
          question: "How long does it take to clear imported goods?",
          answer: "For normal imports, clearance is typically completed within 24 hours of submission of complete documents. However, time may vary based on the type of goods and examination requirements."
        },
        {
          question: "What is the process for duty payment?",
          answer: "Duty can be paid through ICEGATE portal using various payment methods including net banking, credit/debit cards, or through authorized banks. Payment confirmation is required before goods can be cleared."
        },
        {
          question: "Can I get a refund if I overpaid customs duty?",
          answer: "Yes, you can apply for refund of overpaid duty within one year from the date of payment. The refund process typically takes 30 days from the date of application submission."
        }
      ]
    },
    {
      title: "Export Procedures",
      icon: Clock,
      faqs: [
        {
          question: "What is the procedure for export clearance?",
          answer: "Export clearance involves filing a Shipping Bill, presenting goods for examination, obtaining Let Export Order (LEO), and completing export formalities as per the nature of goods."
        },
        {
          question: "How can I track my export shipment?",
          answer: "You can track your export shipment using the reference number provided in the Shipping Bill through our online tracking system or by contacting the concerned officer."
        },
        {
          question: "What is drawback and how do I claim it?",
          answer: "Drawback is a refund of customs duty paid on imported inputs used in the manufacture of exported goods. You can claim drawback by filing an application with supporting documents."
        },
        {
          question: "Are there any export promotion schemes available?",
          answer: "Yes, various schemes like Advance Authorization, EPCG, SEZ, and others are available. Details can be obtained from our export promotion cell."
        }
      ]
    },
    {
      title: "Duty and Taxes",
      icon: Scale,
      faqs: [
        {
          question: "How is customs duty calculated?",
          answer: "Customs duty is calculated based on the CIF value of goods, applicable duty rates, and any additional duties like CVD, SAD, anti-dumping duty, etc. Our duty calculator can help estimate the total duty."
        },
        {
          question: "What is the difference between BCD, CVD, and SAD?",
          answer: "BCD (Basic Customs Duty) is the basic import duty, CVD (Countervailing Duty) is equivalent to excise duty, and SAD (Special Additional Duty) is equivalent to VAT/sales tax on imported goods."
        },
        {
          question: "Are there any exemptions available?",
          answer: "Yes, various exemptions are available under different notifications for specific goods, purposes, or categories of importers. Details can be found in the relevant notifications."
        },
        {
          question: "How can I check the current duty rates?",
          answer: "Current duty rates can be checked through the Customs Tariff Act, 1975, or by using our online tariff information system available on the website."
        }
      ]
    },
    {
      title: "Online Services",
      icon: Users,
      faqs: [
        {
          question: "How do I register for online services?",
          answer: "You can register for online services through the ICEGATE portal using your PAN number and other required details. Registration is free and can be completed online."
        },
        {
          question: "What is ICEGATE and how do I use it?",
          answer: "ICEGATE (Indian Customs EDI Gateway) is the national portal for customs services. You can file documents, make payments, and track applications through this portal."
        },
        {
          question: "Can I file documents online?",
          answer: "Yes, most customs documents including Bill of Entry, Shipping Bill, and various applications can be filed online through the ICEGATE portal."
        },
        {
          question: "How secure are online transactions?",
          answer: "All online transactions are secured using digital signatures and encryption. We follow government security standards to ensure the safety of your data and transactions."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about customs procedures and services
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      className="flex-1 border-none outline-none bg-transparent text-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {faqCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5 text-primary" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Still have questions?</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-muted-foreground">
                    If you couldn't find the answer to your question, please don't hesitate to contact us.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Phone className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-sm text-muted-foreground">+91-20-XXXX-XXXX</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Mail className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-sm text-muted-foreground">info@punecustoms.gov.in</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-primary" />
                      <h3 className="font-semibold">Submit Query</h3>
                      <p className="text-sm text-muted-foreground">Online form available</p>
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
