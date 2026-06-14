"use client"

import { useState } from "react"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { Button } from "@/components/ui/button"

export default function CookiesPage() {
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
                  <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Cookie Settings</h1>
                </div>
              </div>
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
