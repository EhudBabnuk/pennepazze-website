"use client"

import { useState } from "react"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"

export default function AccessibilityPage() {
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
                  <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Accessibility Statement</h1>
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
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Commitment to Accessibility</h2>
                  <p className="text-foreground leading-relaxed">Penne Pazze is committed to ensuring that our website is accessible to everyone, including people with disabilities.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Accessibility Features</h2>
                  <p className="text-foreground leading-relaxed">Our website includes features such as alt text for images, keyboard navigation support, and screen reader compatibility.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Standards Compliance</h2>
                  <p className="text-foreground leading-relaxed">We strive to comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Accessibility Support</h2>
                  <p className="text-foreground leading-relaxed">If you experience any accessibility issues, please contact us and we will work to assist you promptly.</p>
                </div>

                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Contact Accessibility</h2>
                  <p className="text-foreground leading-relaxed">For accessibility concerns, email us at accessibility@pennepazze.com or call (704) 555-1234.</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[COMMITMENT]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">Our Commitment</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder - commitment to accessibility]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[STANDARDS]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">Accessibility Standards</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder - WCAG compliance info]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[FEATURES]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">Accessibility Features</h2>
                  <div className="h-32 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder - list of accessibility features]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[RESTAURANT ACCESS]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">Physical Accessibility</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder - restaurant accessibility info]</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-foreground/30 p-4">
                  <span className="text-xs text-muted-foreground">[FEEDBACK]</span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-3">Feedback & Contact</h2>
                  <div className="h-24 bg-muted/50 border border-dashed border-foreground/30 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">[Content placeholder - how to report issues]</span>
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
