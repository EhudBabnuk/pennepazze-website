"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Briefcase,
  PartyPopper,
  Heart,
  Users,
  ChefHat,
  Truck,
} from "lucide-react"

const benefits = [
  {
    icon: Briefcase,
    title: "Corporate Events & Meetings",
    description: "Impress clients and colleagues with authentic Italian cuisine.",
  },
  {
    icon: PartyPopper,
    title: "Private Parties & Celebrations",
    description: "Make every gathering unforgettable with our curated menus.",
  },
  {
    icon: Heart,
    title: "Weddings & Receptions",
    description: "Elegant Italian dining for your most special day.",
  },
  {
    icon: Users,
    title: "Large Group Orders (50+ people)",
    description: "We scale beautifully for events of any size.",
  },
  {
    icon: ChefHat,
    title: "Custom Menu Options",
    description: "Tailored menus to match your vision and dietary needs.",
  },
  {
    icon: Truck,
    title: "Setup & Delivery Included",
    description: "Full-service from kitchen to your venue, hassle-free.",
  },
]

export default function CateringPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<"A" | "B" | null>(null)

  const locationLinks = {
    A: "https://www.toasttab.com/invoice/lead?rx=efc8ed63-f780-450b-b531-54cd501c79da&ot=87fc5ca4-8965-4c68-8e35-19048e56d6c8",
    B: "https://www.toasttab.com/invoice/lead?rx=0b05b293-b931-4d76-91e7-c48503206c4f&ot=a5514f13-1761-41e1-a960-fdca5a9d499f",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col pb-24 md:pb-0">

        {/* =============================================
            HERO — Full-Bleed 50/50 Split (Image Left, Text Right)
            ============================================= */}
        <section className="w-full border-b border-[#E8E8E8]">
          <div className="flex flex-col lg:flex-row min-h-[50vh] lg:min-h-[70vh]">
            {/* Left Column: Full-bleed image — flush to left edge, 50% width */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-0">
              <Image
                src="/images/catering-hero.jpg"
                alt="Premium Italian catering spread with beautifully plated dishes"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right Column: Text content — vertically centered */}
            <div className="w-full lg:w-1/2 bg-[#FAFAFA] flex items-center">
              <div className="w-full max-w-xl px-8 md:px-12 lg:px-16 py-16 lg:py-24">
                <h1 className="text-foreground mb-3">
                  Catering Services
                </h1>
                <p className="subtitle-2 text-[#C1A561] mb-6">
                  Events & Large Parties
                </p>
                <p
                  className="body-text text-foreground mb-8"
                  style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                >
                  Let us bring delicious authentic Italian cuisine to your next event.
                  We offer full-service catering for corporate events, private parties,
                  weddings, and celebrations.
                </p>
                <PrimaryCTAButton
                  onClick={() => {
                    const el = document.getElementById("request-catering")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-8 py-3"
                  aria-label="Scroll to catering request form"
                >
                  Request Catering
                </PrimaryCTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* =============================================
            SECTION 2 — "What We Offer" — Black bg with pasta pattern
            ============================================= */}
        <section className="w-full py-16 md:py-24 bg-black relative overflow-hidden">
          {/* Pasta pattern background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-WgtbyLqGOpHZhilNb6G49pxuwbPeAh.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
            {/* Heading Area */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-white mb-3">What We Offer</h2>
              <p
                className="text-[#F7F2DE] max-w-xl mx-auto"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.625,
                }}
              >
                Everything your event needs for a memorable Italian dining experience
              </p>
            </div>

            {/* Benefits Grid — Dark cards with gold accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-[#272727] border border-[#C1A561]/40 rounded-lg p-8 flex flex-col items-start gap-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D5B13A] hover:shadow-[0_4px_24px_rgba(213,177,58,0.15)]"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#D5B13A]/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D5B13A]" strokeWidth={1.5} />
                    </div>

                    {/* Card Title - Oswald SemiBold UPPERCASE */}
                    <h4 className="text-white">{benefit.title}</h4>

                    {/* Supporting text */}
                    <p
                      className="text-[#F7F2DE]/70"
                      style={{
                        fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.875rem",
                        lineHeight: 1.625,
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =============================================
            SECTION 3 — Catering Request Form
            ============================================= */}
        <section id="request-catering" className="w-full py-16 md:py-24 bg-white">
          <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-foreground mb-3">Request Catering</h2>
            <p
              className="text-[#999999] mb-12"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.625,
              }}
            >
              Select your location to submit a catering inquiry
            </p>

            <div className="border border-[#E8E8E8] rounded-lg p-8 bg-[#FAFAFA]">
              <div className="flex flex-col gap-8">
                {/* Location Selection */}
                <div className="flex flex-col gap-4">
                  <Label className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">
                    Select Location *
                  </Label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      onClick={() => setSelectedLocation("A")}
                      className={`flex-1 py-3 font-heading font-bold uppercase text-sm tracking-wider rounded transition-all ${
                        selectedLocation === "A"
                          ? "bg-[#D5B13A] text-black hover:bg-[#C1A561]"
                          : "bg-white text-[#D5B13A] border-2 border-[#D5B13A] hover:bg-[#D5B13A]/5"
                      }`}
                    >
                      Location A
                    </Button>
                    <Button
                      onClick={() => setSelectedLocation("B")}
                      className={`flex-1 py-3 font-heading font-bold uppercase text-sm tracking-wider rounded transition-all ${
                        selectedLocation === "B"
                          ? "bg-[#D5B13A] text-black hover:bg-[#C1A561]"
                          : "bg-white text-[#D5B13A] border-2 border-[#D5B13A] hover:bg-[#D5B13A]/5"
                      }`}
                    >
                      Location B
                    </Button>
                  </div>
                </div>

                {/* Toast Tab Iframe */}
                {selectedLocation && (
                  <div className="border border-[#E8E8E8] rounded-lg p-6 bg-white">
                    <p
                      className="text-[#999999] uppercase tracking-wider mb-6"
                      style={{
                        fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                      }}
                    >
                      Catering Request Form - Location {selectedLocation}
                    </p>
                    <iframe
                      src={locationLinks[selectedLocation]}
                      width="100%"
                      height="600"
                      style={{ border: "none", borderRadius: "4px" }}
                      title={`Catering Request Form - Location ${selectedLocation}`}
                    />
                  </div>
                )}

                {/* Empty State */}
                {!selectedLocation && (
                  <div className="border border-[#E8E8E8] rounded-lg p-12 bg-white text-center">
                    <p
                      className="text-[#999999]"
                      style={{
                        fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                        fontSize: "1.125rem",
                      }}
                    >
                      Please select a location above to proceed with your catering request.
                    </p>
                  </div>
                )}
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
