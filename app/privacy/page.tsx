"use client"

import { useState } from "react"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"

export default function PrivacyPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col pb-24 md:pb-0">
        {/* Full-Width Hero Section */}
        <section className="w-full border-b border-border overflow-x-hidden">
          <div className="relative w-full bg-gradient-to-br from-[#D5B13A] to-[#C1A561] min-h-[200px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
            {/* Overlay Content */}
            <div className="relative md:absolute inset-0 w-full flex items-center justify-center overflow-x-hidden z-10">
              <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-0">
                <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 w-full rounded-lg shadow-lg text-center">
                  <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Privacy Policy</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-12 md:py-16 bg-sec-white">
          <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
            <div className="bg-white border border-border rounded-lg p-8">
              <div className="prose prose-sm max-w-none space-y-8">
                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Information We Collect</h2>
                  <p className="text-foreground leading-relaxed">We collect information you provide directly to us, such as when you place an order or contact us for support.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">How We Use Your Information</h2>
                  <p className="text-foreground leading-relaxed">We use the information we collect to process orders, provide customer support, and improve our services.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Data Protection</h2>
                  <p className="text-foreground leading-relaxed">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Your Rights</h2>
                  <p className="text-foreground leading-relaxed">You have the right to access, correct, or delete your personal information. Contact us for any privacy-related requests.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Contact Us</h2>
                  <p className="text-foreground leading-relaxed">For privacy concerns, contact us at privacy@pennepazze.com or call (704) 555-1234.</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 1]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">1. Information We Collect</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 2]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">2. How We Use Information</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 3]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">3. Information Sharing</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 4]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">4. Data Security</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 5]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">5. Your Rights</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[SECTION 6]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">6. Contact Us</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder]</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-8">
                Last updated: [Date Placeholder]
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky Order Button */}
      <StickyOrderButton onClick={() => setOrderModalOpen(true)} />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  )
}
