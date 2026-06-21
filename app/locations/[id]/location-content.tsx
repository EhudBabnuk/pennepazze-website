"use client"

import { useOrderModal } from "@/components/providers/order-modal-provider"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { LocationStatusBadge } from "@/components/ui/location-status-badge"
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LocationProps {
  slug: string
  name: string
  city?: string
  state?: string
  description?: string
  address?: string
  phone?: string
  status?: string
  tagline?: string
  features?: string[]
  hours?: { weekdays?: string; weekend?: string; notes?: string }
  imageSrc?: string
  openingNote?: string
}

interface LocationContentProps {
  location: LocationProps
}

export default function LocationContent({ location }: LocationContentProps) {
  const { openModal } = useOrderModal()
  const isOpen = !location.status || location.status === 'open'

  const features = location.features ?? [
    "Handmade Pasta",
    "House-made Sauces",
    "Zero Seed Oils",
    "Italian Recipes",
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link href="/locations" className="inline-flex items-center gap-2 text-[#D5B13A] hover:text-[#C1A561] transition-colors font-heading font-bold text-sm uppercase tracking-wider mb-6">
              ← Back to Locations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Location Info */}
            <div>
              <p className="text-[#D5B13A] mb-3" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                PennePazze
              </p>
              <div className="flex items-start gap-3 flex-wrap mb-6">
                <h1 className="text-foreground leading-tight">{location.name}</h1>
                <LocationStatusBadge status={location.status} className="mt-2" />
              </div>
              {location.city && (
                <p className="subtitle-2 text-[#C1A561] mb-4">{location.city}{location.state ? `, ${location.state}` : ''}</p>
              )}
              {location.tagline && (
                <p className="text-muted-foreground mb-4 italic" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1.05rem" }}>
                  {location.tagline}
                </p>
              )}
              {location.description && (
                <p className="text-muted-foreground mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.7 }}>
                  {location.description}
                </p>
              )}
              {location.openingNote && (
                <p className="text-[#D5B13A] mb-6 text-sm italic" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}>
                  {location.openingNote}
                </p>
              )}
              {location.imageSrc && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                  <Image src={location.imageSrc} alt={location.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
              {isOpen ? (
                <PrimaryCTAButton onClick={openModal} className="px-8 py-3 text-sm">Order Now</PrimaryCTAButton>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center px-8 py-3 rounded bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                  style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  aria-label="Ordering not yet available at this location"
                >
                  {location.status === 'coming-soon' ? 'Coming Soon' : 'Opening Soon'}
                </button>
              )}
            </div>

            {/* Right: Contact Card */}
            <div className="bg-[#FAFAFA] border border-border rounded-lg p-8">
              {location.address && (
                <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-[#D5B13A]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase text-foreground mb-1" style={{ letterSpacing: "0.05em" }}>Address</p>
                    <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                      {location.address}
                    </p>
                  </div>
                </div>
              )}

              {location.phone && (
                <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-[#D5B13A]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase text-foreground mb-1" style={{ letterSpacing: "0.05em" }}>Phone</p>
                    <a href={`tel:${location.phone}`} className="text-[#D5B13A] hover:text-[#C1A561] transition-colors text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500 }}>
                      {location.phone}
                    </a>
                  </div>
                </div>
              )}

              {location.hours && (location.hours.weekdays || location.hours.notes) && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-[#D5B13A]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm uppercase text-foreground mb-1" style={{ letterSpacing: "0.05em" }}>Hours</p>
                    {location.hours.weekdays && (
                      <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                        {location.hours.weekdays}
                      </p>
                    )}
                    {location.hours.notes && (
                      <p className="text-muted-foreground text-sm mt-1" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                        {location.hours.notes}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features / Specialties */}
      <section className="w-full py-16 md:py-24 bg-[#FEF0B1] border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-12">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature: string) => (
              <div key={feature} className="flex gap-4">
                <div className="w-1 bg-[#D5B13A] shrink-0" />
                <div>
                  <h4 className="text-foreground mb-2">{feature}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-foreground mb-6">Ready to dine with us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.7 }}>
            Explore our full menu and place your order online, or stop in for lunch or dinner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="inline-flex items-center justify-center gap-2 bg-[#D5B13A] text-black px-6 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded hover:bg-[#C1A561] transition-colors">
              View Menu <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/catering" className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-6 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded hover:bg-foreground hover:text-white transition-colors">
              Catering Info
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
