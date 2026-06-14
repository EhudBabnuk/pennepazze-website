"use client"

import { useState } from "react"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"

export default function TermsPage() {
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
                  <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Terms of Use</h1>
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
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">1. Acceptance of Terms</h2>
                  <p className="text-foreground leading-relaxed">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">2. Use of Service</h2>
                  <p className="text-foreground leading-relaxed">This website is intended for lawful purposes only. You agree not to use this website for any unlawful or prohibited activities.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">3. User Responsibilities</h2>
                  <p className="text-foreground leading-relaxed">You agree to provide accurate information and are responsible for all activities conducted through your use of this website.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">4. Intellectual Property</h2>
                  <p className="text-foreground leading-relaxed">All content on this website, including text, graphics, logos, and images, are the property of Penne Pazze and are protected by copyright laws.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">5. Limitation of Liability</h2>
                  <p className="text-foreground leading-relaxed">Penne Pazze shall not be liable for any damages arising from your use of this website or the content provided herein.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">6. Contact Information</h2>
                  <p className="text-foreground leading-relaxed">For questions regarding these terms, please contact us at support@pennepazze.com or call (704) 555-1234.</p>
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
