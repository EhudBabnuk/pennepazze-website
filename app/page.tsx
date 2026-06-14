"use client"

import { useState } from "react"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { InstagramFeed } from "@/components/wireframe/instagram-feed"
import { UpdatesCarousel } from "@/components/wireframe/updates-carousel"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { LinkCTA } from "@/components/ui/link-cta"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  const scrollToContent = () => {
    const el = document.getElementById("content")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col">
        {/* Full-Bleed Video Hero - No content card, video only */}
        <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden h-[75svh] md:h-[85svh]">
          {/* Hero Background Media Container */}
          <div className="hero-media">
            {/* Vimeo Video - True Cover Technique */}
            <iframe
              src="https://player.vimeo.com/video/750022321?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0&badge=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Penne Pazze restaurant ambiance video"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "max(100vw, calc(100svh * 16 / 9))",
                height: "max(100svh, calc(100vw * 9 / 16))",
                minWidth: "100%",
                minHeight: "100%",
                border: "0",
                pointerEvents: "none"
              }}
            />
            <script src="https://player.vimeo.com/api/player.js" async />

            {/* Gradient Fallback Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D5B13A] to-black" />

            {/* Subtle dark overlay for navbar readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-[1]" />
          </div>

          {/* Scroll Down Indicator */}
          <div className="hero-content h-full flex items-end justify-center pb-10 md:pb-12">
            <button
              onClick={scrollToContent}
              className="flex flex-col items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B13A] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
              aria-label="Scroll down to content"
            >
              <span
                className="text-white/70 text-sm md:text-base tracking-widest uppercase group-hover:text-white/90 transition-colors duration-300"
                style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500 }}
              >
                scroll down
              </span>
              <span className="w-12 h-12 rounded-full border-2 border-[#C1A561] flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:bg-[#D5B13A]/20 group-hover:border-[#D5B13A] transition-all duration-300">
                <ChevronDown className="w-6 h-6 text-[#C1A561] group-hover:text-[#D5B13A] group-hover:translate-y-0.5 transition-all duration-300" />
              </span>
            </button>
          </div>
        </section>

        {/* Explore Our Offerings — Staggered Image Tiles */}
        <section id="content" className="w-full py-16 md:py-24 bg-white border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-foreground mb-3">Explore Our Offerings</h2>
              <p
                className="text-muted-foreground max-w-xl mx-auto"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                Discover what makes Penne Pazze special
              </p>
            </div>

            {/* 3-column staggered grid, middle tile offset */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tile 1: Our Menu */}
              <div>
                <OfferingTile
                  title="Our Menu"
                  description="Explore our carefully curated selection of authentic Italian dishes"
                  image="/images/tile-menu.jpg"
                  href="/menu"
                  buttonLabel="View Menu"
                />
              </div>

              {/* Tile 2: Catering — offset down */}
              <div className="md:translate-y-10">
                <OfferingTile
                  title="Catering"
                  description="Let us bring amazing Italian cuisine to your next event"
                  image="/images/tile-catering.jpg"
                  href="/catering"
                  buttonLabel="Learn More"
                />
              </div>

              {/* Tile 3: About Us */}
              <div>
                <OfferingTile
                  title="About Us"
                  description="Discover our story and passion for authentic Italian cooking"
                  image="/images/tile-about.jpg"
                  href="/about"
                  buttonLabel="Read More"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seed Oil-Free Section */}
        <section className="w-full py-16 md:py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
          {/* Pasta pattern background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-GGDrpMph7Hcr7wBG5VtQJmhOnPVZNH.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center">
              <p
                className="text-[#D5B13A] mb-4 uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                }}
              >
                Motek is now 100%
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-8"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontStyle: "italic",
                }}
              >
                Seed Oil-Free
              </h2>

              <p
                className="max-w-3xl mx-auto mb-8 leading-relaxed"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#F7F2DE",
                }}
              >
                At Penne Pazze, we've always cooked with heart. Now, we're taking it a step further by removing all seed oils from our kitchen. These industrial oils don't align with the fresh, wholesome cooking that defines who we are.
              </p>

              <p
                className="max-w-3xl mx-auto mb-12 leading-relaxed"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#F7F2DE",
                }}
              >
                Instead, we're choosing ingredients you can feel good about—the kind we serve to our own families. Thoughtful cooking, real nourishment, and flavors rooted in tradition. Better food, made with care. For your health, your family, and your table.
              </p>

              <p
                className="text-[#F7F2DE] mb-2"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                }}
              >
                With love,
              </p>
              <p
                className="text-white font-heading font-bold text-lg tracking-wider"
                style={{
                  fontSize: "1.125rem",
                  letterSpacing: "0.025em",
                }}
              >
                The Penne Pazze Family
              </p>
            </div>
          </div>
        </section>

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Updates & Highlights Carousel */}
        <UpdatesCarousel />

        {/* About Preview Section */}
        <section className="w-full py-16 md:py-24 bg-secondary border-t border-border">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-lg h-80 md:h-96 bg-gradient-to-br from-[#D5B13A] to-[#C1A561] flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <span className="text-sm">Restaurant Interior Image</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-6">Our Story</h2>
                <p className="text-lg text-foreground mb-6 leading-relaxed">
                  Penne Pazze was born from a passion for authentic Italian cuisine. We believe that great food starts with quality ingredients and traditional recipes crafted with love and expertise.
                </p>
                <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                  Every dish we serve tells a story of Italian heritage, bringing you an authentic culinary experience that celebrates the flavors and traditions of Italy.
                </p>
                <PrimaryCTAButton
                  asChild
                  className="px-8 py-3"
                >
                  <Link href="/about">
                    Read Our Full Story
                  </Link>
                </PrimaryCTAButton>
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

/* -------------------------------------------------------
   SUB-COMPONENT: OfferingTile
   ------------------------------------------------------- */

function OfferingTile({
  title,
  description,
  image,
  href,
  buttonLabel,
}: {
  title: string
  description: string
  image: string
  href: string
  buttonLabel: string
}) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text + CTA — bottom aligned */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white mb-2">{title}</h4>
        <p
          className="text-[#F7F2DE]/85 mb-5 max-w-sm"
          style={{
            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.9375rem",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded px-6 py-3 uppercase tracking-wide leading-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5B13A] bg-[#D5B13A] text-black hover:bg-[#C1A561]"
          style={{
            fontFamily: "var(--font-heading), 'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
          }}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  )
}
