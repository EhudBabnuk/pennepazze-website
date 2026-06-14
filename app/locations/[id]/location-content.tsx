"use client"

import { Location } from "@/lib/locations"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface LocationContentProps {
  location: Location
}

export default function LocationContent({ location }: LocationContentProps) {
  const handleOrderClick = () => {
    console.log("[v0] Order Now clicked for location:", location.id)
  }

  const specialties = [
    { name: "Handmade Pasta", description: "Crafted fresh daily using traditional techniques" },
    { name: "Brick Oven Pizza", description: "Authentic wood-fired pizza with premium ingredients" },
    { name: "Seasonal Specials", description: "Chef-created dishes highlighting fresh, local produce" },
    { name: "Italian Wines", description: "Curated selection of wines from across Italy" },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-[#D5B13A] hover:text-[#C1A561] transition-colors font-heading font-bold text-sm uppercase tracking-wider mb-6"
            >
              ← Back to Locations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Location Info */}
            <div>
              <p
                className="text-[#D5B13A] mb-3"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {location.name}
              </p>
              <h1 className="text-foreground mb-6">{location.name}</h1>
              <p className="subtitle-2 text-[#C1A561] mb-4">{location.city}</p>
              <p
                className="text-muted-foreground mb-8"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {location.description}
              </p>

              <PrimaryCTAButton onClick={handleOrderClick} className="px-8 py-3 text-sm">Order Now</PrimaryCTAButton>
            </div>

            {/* Right: Contact Card */}
            <div className="bg-[#FAFAFA] border border-border rounded-lg p-8">
              {/* Address */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[#D5B13A]" />
                </div>
                <div>
                  <p
                    className="font-heading font-bold text-sm uppercase text-foreground mb-1"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Address
                  </p>
                  <p
                    className="text-muted-foreground text-sm"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {location.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-[#D5B13A]" />
                </div>
                <div>
                  <p
                    className="font-heading font-bold text-sm uppercase text-foreground mb-1"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${location.phone}`}
                    className="text-[#D5B13A] hover:text-[#C1A561] transition-colors text-sm"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {location.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-[#D5B13A]" />
                </div>
                <div>
                  <p
                    className="font-heading font-bold text-sm uppercase text-foreground mb-1"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Hours
                  </p>
                  <p
                    className="text-muted-foreground text-sm"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {location.hours.weekday}
                    <br />
                    {location.hours.weekend}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="w-full py-16 md:py-24 bg-[#FEF0B1] border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-12">Our Specialties</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialties.map((specialty) => (
              <div key={specialty.name} className="flex gap-4">
                <div className="w-1 bg-[#D5B13A] shrink-0" />
                <div>
                  <h4 className="text-foreground mb-2">{specialty.name}</h4>
                  <p
                    className="text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.9375rem",
                    }}
                  >
                    {specialty.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Link */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-foreground mb-6">Ready to dine with us?</h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
            style={{
              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Explore our full menu and place your order online, or make a reservation to dine in.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-[#D5B13A] text-black px-6 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded hover:bg-[#C1A561] transition-colors"
            >
              View Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catering"
              className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-6 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded hover:bg-foreground hover:text-white transition-colors"
            >
              Catering Info
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
