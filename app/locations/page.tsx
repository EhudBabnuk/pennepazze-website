"use client"

import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { locations } from "@/lib/locations"
import Link from "next/link"

export default function LocationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-white border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <h1 className="text-foreground mb-4">Our Locations</h1>
              <p
                className="text-muted-foreground max-w-2xl mx-auto"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                Visit either of our restaurant locations. Find hours, contact information, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function LocationCard({ location }: { location: (typeof locations)[0] }) {
  return (
    <Link href={`/locations/${location.id}`}>
      <div className="group border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-[#D5B13A] transition-all duration-200 cursor-pointer flex flex-col h-full bg-white">
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-[#D5B13A]/20 to-black/10 flex items-center justify-center">
          <p
            className="text-[#D5B13A]/40 font-heading font-bold text-lg uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            {location.name}
          </p>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-foreground mb-1">{location.name}</h3>
          <p
            className="text-muted-foreground text-sm mb-4"
            style={{
              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
              fontWeight: 400,
            }}
          >
            {location.city}, {location.state}
          </p>

          <div className="flex-1 flex flex-col gap-3 mb-6">
            <button
              onClick={(e) => {
                e.preventDefault()
                window.location.href = `tel:${location.phone}`
              }}
              className="text-muted-foreground hover:text-[#D5B13A] transition-colors text-sm text-left"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 400,
              }}
            >
              {location.phone}
            </button>

            <p
              className="text-muted-foreground text-sm"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {location.address}
            </p>

            <div>
              <p
                className="text-muted-foreground text-xs mb-1"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
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

          <p
            className="text-[#D5B13A] group-hover:text-[#C1A561] transition-colors text-sm"
            style={{
              fontFamily: "var(--font-heading), 'Oswald', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            View Details →
          </p>
        </div>
      </div>
    </Link>
  )
}
