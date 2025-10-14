import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, Phone, Mail, FileText, Clock, Users, Scale } from "lucide-react"

export default function FAQsPage() {
  const faqCategories = [
    {
      title: "Electronic Sealing (E‑Sealing) for Self‑Sealed Containers",
      icon: HelpCircle,
      faqs: [
        {
          question: "What is the new procedure for sealing export containers?",
          answer: "From 01.10.2017, physical supervised sealing at factory/warehouse has been discontinued. Eligible exporters self‑seal their containers using RFID electronic seals as per CBEC circulars (26/2017, 36/2017, 37/2017, 41/2017)."
        },
        {
          question: "Who can avail self‑sealing?",
          answer: "(i) All AEO exporters; (ii) exporters earlier availing supervised factory stuffing; (iii) exporters after intimation/permission to jurisdictional Customs as per Circular 26/2017; and (iv) those already approved for self‑sealing under erstwhile procedures."
        },
        {
          question: "What is an RFID e‑seal?",
          answer: "A tamper‑evident bolt‑type seal with an embedded RFID tag readable by fixed/handheld readers at ports/ICDs. Customs verifies integrity from vendor data and readers integrated with ICEGATE."
        },
        {
          question: "How is the e‑seal used to lock the container?",
          answer: "It works like a conventional bolt seal: insert the bolt into the cap until it clicks. Use only the paired male/female parts supplied together."
        },
        {
          question: "How is data retrieved from the e‑seal?",
          answer: "Readers at ports/ICDs read the tag and show whether it is TAMPered or NOT TAMPERED. Alerts may be sent to the exporter’s registered mobile/email by vendor systems."
        },
        {
          question: "Are vendors allowed distributors? Minimum order quantity?",
          answer: "No distributors are permitted for security reasons; orders are placed online. No mandated min/max quantity, though seals are typically sold in boxes of 20/30 (not loose)."
        },
        {
          question: "What are the e‑seal specifications?",
          answer: "RFID seals must conform to ISO 17712:2013(H) and ISO/IEC 18000‑6 Class 1 Gen 2 as per Circular 36/2017."
        },
        {
          question: "Is IEC required to purchase e‑seals?",
          answer: "Yes. IEC and factory‑stuffing/self‑sealing permission are required to purchase e‑seals."
        },
        {
          question: "What data must be provided for each e‑seal?",
          answer: "IEC, Shipping Bill number/date, e‑seal number, sealing date/time, destination Customs station, container number, and trailer/truck number. Data is entered in vendor web/mobile app, linked to the seal and cannot be edited after confirmation."
        },
        {
          question: "Is Shipping Bill number mandatory?",
          answer: "Yes."
        },
        {
          question: "What transport document is required to move a self‑sealed container?",
          answer: "As per GST laws: e‑way bill/transport challan/lorry receipt etc. For non‑GST registrants, way bill or equivalent transport document."
        },
        {
          question: "What happens at the port/ICD gate?",
          answer: "Customs verifies the e‑seal. If NOT TAMPERED, the consignment is processed for registration and LEO. If TAMPERED, goods are taken up for examination per procedures."
        },
        {
          question: "Can exporters get an e‑seal reader?",
          answer: "Some vendors provide readers to exporters for cross‑checking."
        },
        {
          question: "Can an exporter block an e‑seal?",
          answer: "Yes, an allotted e‑seal can be blocked if it will not be used."
        },
        {
          question: "Can data be edited after confirmation (e.g., vehicle breakdown)?",
          answer: "No. Data once confirmed cannot be edited or deleted. Verify accuracy before confirming."
        },
        {
          question: "How to handle multiple Shipping Bills/invoices?",
          answer: "Currently, a single Shipping Bill can be linked per e‑seal. For multiple Shipping Bills, provide physical dockets for all Shipping Bills at the customs station/parking plaza."
        },
        {
          question: "How will Customs clearance/rejection information be communicated?",
          answer: "Information is transmitted to the exporter’s registered email from the vendor’s server."
        }
      ]
    },
    {
      title: "Customs Brokers Licensing Regulations, 2018 (CBLR 2018) & CBLMS",
      icon: Users,
      faqs: [
        {
          question: "What is CBLMS?",
          answer: "Customs Brokers License Management System is a centralized online platform for CB licensing processes with end‑to‑end IT integration to reduce physical interface, standardize procedures, and bring accountability."
        },
        {
          question: "Is CB Profile registration mandatory? Who is eligible?",
          answer: "Yes. All Customs Brokers with licenses issued by Pr./Commissioner and operating under CBLR 2018 or prior regulations must register their CB Profile in CBLMS."
        },
        {
          question: "Prerequisites to register on CBLMS",
          answer: "Valid CB License and CBLMS login credentials sent via SMS to the ICEGATE‑registered mobile number."
        },
        {
          question: "Documents to upload for CB Profile",
          answer: "CB License; notarized proprietorship/partnership deed or incorporation certificate with MoA/AoA; security deposit proof; office address proof (lease and electricity bill); photos/IDs of proprietors/partners/directors; authorized person’s F‑category exam result; employee documents incl. PAN/Aadhaar and F/G/H card details."
        },
        {
          question: "Security deposit requirements",
          answer: "Total security deposit: Rs. 5,00,000. It may be paid in a single or multiple modes (e.g., multiple bank guarantees) with details captured in the application."
        },
        {
          question: "Eligibility for CB license applicants",
          answer: "Minimum two years’ experience as a G‑card holder or retired IRS (Customs & Central Excise) Group A officer with 5 years’ Group A experience, along with proof of financial viability (Scheduled Bank certificate or assets ≥ Rs. 5 lakh)."
        },
        {
          question: "License validity and reactivation",
          answer: "License is lifetime unless revoked/surrendered; restricted to principal customs station for first two years. If inactive for a year, it can be reactivated by the Commissioner upon application and fee."
        },
        {
          question: "Use of CBLMS and authorized services",
          answer: "CBLMS must be used for authorized services under CBLR 2018. Fresh Form‑C intimations under Regulation 7(3) can be submitted on CBLMS."
        },
        {
          question: "Primary details to fill in CB Profile",
          answer: "CB License no./issue date/validity or lifetime validity; entity docs; PAN; GSTIN; and upload of the license copy."
        },
        {
          question: "Security deposit section details",
          answer: "Mode, reference numbers, issue/validity dates; auto‑renewal if applicable. Multiple modes may be supported by the portal; follow on‑screen guidance."
        },
        {
          question: "Authorized person details",
          answer: "Details of the person on whose F‑category exam result the license is issued: result copy, mobile/email, PAN, Aadhaar, education."
        },
        {
          question: "Partners/Directors and Employees",
          answer: "Enter details for all partners/directors. For employees, enter pass category (F/F with POA/G/G with POA/H), exam passed year, PAN, Aadhaar, and qualifications."
        },
        {
          question: "Other branches and Parent Policy Section",
          answer: "Upload details of all customs stations transacted under Reg. 7(3). Parent Policy Section is the CB Section of the Commissionerate that granted the license."
        },
        {
          question: "Document formats and contacts",
          answer: "Upload documents in PDF or JPG/JPEG as per CBLMS specifications. Use ICEGATE‑registered email/mobile. CBLMS helpdesk: 022‑22757921 (Mon–Fri, 9:30am–6pm)."
        },
        {
          question: "Editing and submission",
          answer: "Use Save & Continue to proceed. After final submission, editing is not allowed unless the form is returned by the validating officer. Undertaking checkbox is mandatory."
        }
      ]
    },
    {
      title: "MOOWR (Manufacture and Other Operations in Warehouse) – Section 65",
      icon: FileText,
      faqs: [
        {
          question: "What is MOOWR (2019) and its objective?",
          answer: "A CBIC program under Section 65 of the Customs Act enabling manufacture/other operations in a bonded warehouse with duty deferment (no interest), no investment threshold/export obligation, and full remission for exports."
        },
        {
          question: "Who is eligible to apply?",
          answer: "(i) Holders (or applicants) of a Private Bonded Warehouse license under Section 58; and (ii) entities applying simultaneously for Sec. 58 license and Sec. 65 permission. Applicant must be an Indian citizen/entity registered in India."
        },
        {
          question: "Is MOOWR available for units selling only in DTA?",
          answer: "Yes. There is no quantitative restriction on DTA sales. Any DTA unit may apply to import goods under duty deferment for storage/processing in the warehouse."
        },
        {
          question: "Is manufacture allowed in a Public Bonded Warehouse (Sec. 57)?",
          answer: "No. Manufacture/operations are presently allowed only in Private Bonded Warehouses (Sec. 58)."
        },
        {
          question: "Is there daily physical control by Customs?",
          answer: "No. Units are not under day‑to‑day physical control; they are subject to risk‑based audits."
        },
        {
          question: "Is a built structure mandatory to obtain licenses?",
          answer: "A fully enclosed structure is not mandated. Premises must be suitable for secure storage and compliance (boundary walls, gate/access control, personnel). The Commissioner considers the adequacy of security arrangements."
        },
        {
          question: "Do licenses/permissions require renewal?",
          answer: "No renewal is required; they remain valid until cancelled/surrendered."
        },
        {
          question: "Can capital goods be imported without duty? Is IGST also deferred?",
          answer: "Yes. Both BCD and IGST are deferred on capital goods until home consumption (Sec. 68/61) or export (Sec. 69). No interest is payable; no time limit on deferment."
        },
        {
          question: "Is extra duty on finished goods due because capital goods were imported duty‑deferred?",
          answer: "No. Duty on capital goods is payable only if those capital goods are cleared to DTA. It is not incorporated into finished goods duty."
        },
        {
          question: "Are inputs/raw materials also eligible for duty deferment?",
          answer: "Yes. Both BCD and IGST on inputs are deferred until home consumption; no interest. If finished goods are exported, duties on inputs are remitted."
        },
        {
          question: "Is interest payable when duties are paid on DTA clearance?",
          answer: "No interest liability arises; duties are paid at ex‑bonding without interest."
        },
        {
          question: "Is a warehouse keeper mandatory? Are all clearances inspected?",
          answer: "Yes, a warehouse keeper must be appointed for a Sec. 58 private warehouse. Ex‑bond inspection occurs only on risk indications; bond officer approval is not routinely required for clearance."
        },
        {
          question: "Audit frequency",
          answer: "Risk‑based; no prescribed fixed frequency."
        },
        {
          question: "Documents for movement of duty‑deferred goods",
          answer: "(i) Customs station → Sec. 65 unit: Bill of Entry for warehousing; (ii) Non‑Sec.65 warehouse → Sec.65 unit: Warehoused Goods (Removal) Regs., 2016 form; (iii) Sec.65 unit → another warehouse: MOOWR (No.2) Regs., 2019 form. No customs escort."
        },
        {
          question: "Depreciation on used capital goods if cleared to DTA?",
          answer: "No depreciation is available on such clearances."
        },
        {
          question: "Export of used capital goods from the warehouse",
          answer: "Permitted without payment of duty under Sec. 69. Valuation follows Sec. 14 and the Export Valuation Rules, 2007."
        },
        {
          question: "Compatibility with FTP/IGCR benefits",
          answer: "Units under Sec. 65 may avail other benefits if the respective scheme allows."
        },
        {
          question: "Inventory control method",
          answer: "Follow Generally Accepted Accounting Principles; FIFO may be adopted."
        },
        {
          question: "Handling returns for repair (DTA or export returns)",
          answer: "DTA returns are entered as DTA receipts; after repair, clearances are recorded accordingly. Export returns upon re‑import are entered as import receipts and relevant re‑import notifications must be followed."
        },
        {
          question: "Surrender of license",
          answer: "Follow Regulation 8 of Private Warehouse Licensing Regulations, 2016. Apply to the Principal/Commissioner; cancellation is subject to payment of dues and clearance of remaining goods."
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
