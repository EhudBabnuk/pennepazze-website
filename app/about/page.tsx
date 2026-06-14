"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { LinkCTA } from "@/components/ui/link-cta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

/* -------------------------------------------------------
   DATA
   ------------------------------------------------------- */

const passionTiles = [
  {
    title: "Quality",
    text: "Only the finest Italian ingredients, sourced with care for authentic flavor.",
    image: "/images/about-quality.jpg",
  },
  {
    title: "Passion",
    text: "Every dish made with love and dedication to our craft and customers.",
    image: "/images/about-passion.jpg",
  },
  {
    title: "Tradition",
    text: "Honoring Italian culinary traditions through authentic recipes and techniques.",
    image: "/images/about-tradition.jpg",
  },
]

const locations = [
  {
    id: "branch-a",
    name: "Branch A",
    image: "/images/location-branch-a.jpg",
    address: "[Address Placeholder - Branch A]",
    phone: "[Phone Placeholder]",
    hours: [
      "Monday - Thursday: 11am - 10pm",
      "Friday - Saturday: 11am - 11pm",
      "Sunday: 12pm - 9pm",
    ],
  },
  {
    id: "branch-b",
    name: "Branch B",
    image: "/images/location-branch-b.jpg",
    address: "[Address Placeholder - Branch B]",
    phone: "[Phone Placeholder]",
    hours: [
      "Monday - Thursday: 11am - 10pm",
      "Friday - Saturday: 11am - 11pm",
      "Sunday: 12pm - 9pm",
    ],
  },
]

/* -------------------------------------------------------
   PAGE
   ------------------------------------------------------- */

export default function AboutPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("[Wireframe] Form submitted - would send contact message")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col pb-24 md:pb-0">

        {/* =============================================
            1) HERO — Dark background image + "About Us"
            ============================================= */}
        <section className="relative w-full overflow-hidden border-b border-border">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/about-hero.jpg"
              alt="Penne Pazze restaurant interior ambiance"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Centered title */}
          <div className="relative z-10 flex items-center justify-center min-h-[350px] md:min-h-[450px] lg:min-h-[500px] px-4">
            <h1 className="text-white text-center">About Us</h1>
          </div>
        </section>

        {/* =============================================
            2) OUR PASSION — 3 staggered image tiles
            ============================================= */}
        <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            {/* Heading + Intro */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-foreground mb-4">Our Passion</h2>
              <p
                className="text-muted-foreground max-w-3xl"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                We craft authentic Italian dishes using traditional methods and the finest
                ingredients. From our handmade pasta to our signature sauces, every element
                is prepared with care and passion to deliver a genuine Italian culinary
                experience.
              </p>
            </div>

            {/* Staggered Tiles: 3 columns in one row, middle offset down */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {passionTiles.map((tile, index) => (
                <div
                  key={tile.title}
                  className={index === 1 ? "md:translate-y-10" : ""}
                >
                  <PassionTile {...tile} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============================================
            3) LOCATIONS — Image left, details right
            ============================================= */}
        <section id="locations" className="w-full py-16 md:py-24 bg-white border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-foreground mb-12 md:mb-16">Our Locations</h2>

            <div className="flex flex-col gap-16 md:gap-20">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex flex-col lg:flex-row gap-8 lg:gap-12"
                >
                  {/* LEFT: Branch image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden">
                      <Image
                        src={location.image}
                        alt={`${location.name} restaurant location`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* RIGHT: Branch details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-foreground mb-6">{location.name}</h3>

                    <div className="flex flex-col gap-5">
                      {/* Address */}
                      <div>
                        <p className="subtitle-3 text-[#C1A561] mb-1">Address</p>
                        <p
                          className="text-foreground"
                          style={{
                            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "1rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {location.address}
                        </p>
                      </div>

                      {/* Phone */}
                      <div>
                        <p className="subtitle-3 text-[#C1A561] mb-1">Phone</p>
                        <p
                          className="text-foreground"
                          style={{
                            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: "1rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {location.phone}
                        </p>
                      </div>

                      {/* Hours */}
                      <div>
                        <p className="subtitle-3 text-[#C1A561] mb-1">Hours</p>
                        {location.hours.map((hour, idx) => (
                          <p
                            key={idx}
                            className="text-foreground"
                            style={{
                              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                              fontWeight: 500,
                              fontSize: "0.9375rem",
                              lineHeight: 1.7,
                            }}
                          >
                            {hour}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Learn More link */}
                    <div className="mt-6">
                      <LinkCTA href={`#${location.id}`}>
                        Learn More
                      </LinkCTA>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============================================
            4) CONTACT US
            ============================================= */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          {/* Gold pasta pattern background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-ZT1M85llWCS3lRznZpCUrzMylFRLYm.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Subtle light overlay for text readability */}
          <div className="absolute inset-0 bg-[#F7F2DE]/70 pointer-events-none" />
          <div className="w-full max-w-2xl mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-foreground mb-3">Contact Us</h2>
            <p
              className="text-muted-foreground mb-8"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              Have a question? We&apos;d love to hear from you. Send us a message and
              we&apos;ll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="border border-border rounded-lg p-8 bg-white">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="name"
                    className="font-heading font-bold text-foreground uppercase text-sm tracking-wider"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="border border-border rounded h-12 text-foreground"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="font-heading font-bold text-foreground uppercase text-sm tracking-wider"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="your@email.com"
                    className="border border-border rounded h-12 text-foreground"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="message"
                    className="font-heading font-bold text-foreground uppercase text-sm tracking-wider"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    className="border border-border rounded text-foreground"
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-[#D5B13A] text-black font-heading font-bold uppercase text-sm tracking-wider hover:bg-[#C1A561] transition-colors rounded"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <StickyOrderButton onClick={() => setOrderModalOpen(true)} />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  )
}

/* -------------------------------------------------------
   PASSION TILE COMPONENT
   ------------------------------------------------------- */

function PassionTile({
  title,
  text,
  image,
}: {
  title: string
  text: string
  image: string
}) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Text overlay - bottom aligned */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white mb-2">{title}</h4>
        <p
          className="text-white/85 max-w-sm"
          style={{
            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.9375rem",
            lineHeight: 1.6,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
