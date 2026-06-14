"use client"

import React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, FileText, ChefHat, HandPlatter, Truck, UserCog } from "lucide-react"

/* -------------------------------------------------------
   DATA
   ------------------------------------------------------- */

const teamTiles = [
  {
    title: "Kitchen Team",
    image: "/images/team-kitchen.jpg",
  },
  {
    title: "Service Team",
    image: "/images/team-service.jpg",
  },
  {
    title: "Delivery Team",
    image: "/images/team-delivery.jpg",
  },
]

const roleCards = [
  {
    icon: ChefHat,
    title: "Kitchen",
    roles: ["Pizza Makers", "Line Cooks", "Prep Cooks", "Kitchen Manager"],
  },
  {
    icon: HandPlatter,
    title: "Service",
    roles: ["Cashiers", "Front Counter", "Phone Orders", "Shift Supervisors"],
  },
  {
    icon: Truck,
    title: "Delivery",
    roles: ["Delivery Drivers", "Dispatch"],
  },
  {
    icon: UserCog,
    title: "Management",
    roles: ["Assistant Manager", "General Manager"],
  },
]

/* -------------------------------------------------------
   PAGE
   ------------------------------------------------------- */

export default function CareersPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("[Wireframe] Form submitted - would send job application")
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col pb-24 md:pb-0">

        {/* =============================================
            1) HERO — Dark background image + centered title
            ============================================= */}
        <section className="relative w-full overflow-hidden border-b border-border">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/careers-hero.jpg"
              alt="Penne Pazze restaurant kitchen ambiance"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Centered text stack */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[350px] md:min-h-[450px] lg:min-h-[500px] px-4">
            <h1 className="text-white mb-4">Careers</h1>
            <p className="subtitle-1 text-white/90 mb-2">Join Our Team</p>
            <p
              className="text-white/70 max-w-md"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1.125rem",
                lineHeight: 1.6,
              }}
            >
              Be Part of Something Special
            </p>
          </div>
        </section>

        {/* =============================================
            2) OUR TEAM — Staggered 3-tile layout
            ============================================= */}
        <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            {/* Heading */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-foreground mb-4">Our Team</h2>
              <p
                className="text-muted-foreground max-w-3xl"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                Meet the passionate people behind Penne Pazze
              </p>
            </div>

            {/* Staggered Tiles: 3 columns, middle offset down */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamTiles.map((tile, index) => (
                <div
                  key={tile.title}
                  className={index === 1 ? "md:translate-y-10" : ""}
                >
                  <TeamTile {...tile} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============================================
            3) TYPES OF ROLES — Black bg with pasta pattern
            ============================================= */}
        <section className="w-full py-16 md:py-24 bg-black relative overflow-hidden">
          {/* Pasta pattern background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-aEGVmB8Z3hSEY2VvbgeSPwBfPPMG1V.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            {/* Heading */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-white mb-4">Types of Roles</h2>
              <p
                className="text-[#F7F2DE] max-w-2xl"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                We have a variety of positions available across both our locations.
                Whether you are passionate about cooking, enjoy customer service, or
                prefer delivery, we have opportunities for you.
              </p>
            </div>

            {/* Role Cards — dark bg, gold accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roleCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="bg-[#272727] border border-[#C1A561]/40 rounded-lg p-8 flex flex-col gap-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D5B13A] hover:shadow-[0_4px_24px_rgba(213,177,58,0.15)]"
                  >
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D5B13A]/15 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#D5B13A]" strokeWidth={1.5} />
                      </div>
                      <h3
                        className="text-white"
                        style={{ fontSize: "1.25rem", letterSpacing: "0.025em" }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Roles list */}
                    <ul className="flex flex-col gap-2.5 pl-1">
                      {card.roles.map((role) => (
                        <li key={role} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D5B13A] shrink-0" />
                          <span
                            className="text-[#F7F2DE]/70"
                            style={{
                              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                              fontWeight: 400,
                              fontSize: "0.9375rem",
                              lineHeight: 1.5,
                            }}
                          >
                            {role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =============================================
            4) APPLICATION FORM
            ============================================= */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
            <h2 className="text-foreground mb-3">Apply Now</h2>
            <p
              className="text-muted-foreground mb-8"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              Ready to join Penne Pazze? Submit your application below.
            </p>

            <form onSubmit={handleSubmit} className="border border-border rounded-lg p-8 bg-[#FAFAFA]">
              <div className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fullName" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Full Name *</Label>
                  <Input id="fullName" placeholder="Your full name" className="border border-border rounded h-12 text-foreground bg-white" required />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Phone *</Label>
                  <Input id="phone" type="tel" inputMode="numeric" placeholder="(123) 456-7890" className="border border-border rounded h-12 text-foreground bg-white" required />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Email *</Label>
                  <Input id="email" type="email" inputMode="email" placeholder="your@email.com" className="border border-border rounded h-12 text-foreground bg-white" required />
                </div>

                {/* Position Interest */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="position" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Position Interest</Label>
                  <Input id="position" placeholder="e.g., Kitchen, Service, Delivery, Management" className="border border-border rounded h-12 text-foreground bg-white" />
                </div>

                {/* Resume Upload */}
                <div className="flex flex-col gap-2">
                  <Label className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Resume Upload *</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-[#D5B13A] p-8 flex flex-col items-center justify-center gap-3 hover:bg-[#D5B13A]/5 transition-colors rounded text-center bg-white"
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="w-10 h-10 text-[#D5B13A]" />
                        <span className="text-sm text-foreground font-medium">{selectedFile.name}</span>
                        <span className="text-xs text-muted-foreground">Click to change file</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-[#D5B13A]" />
                        <span className="text-sm text-foreground font-medium">
                          <span className="hidden md:inline">Click to upload resume</span>
                          <span className="md:hidden">Tap to upload resume</span>
                        </span>
                        <span className="text-xs text-muted-foreground">PDF, DOC, or DOCX</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="notes" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Tell us why you'd be a great fit for Penne Pazze..." className="border border-border rounded text-foreground bg-white" rows={5} />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full md:w-auto h-12 px-8 bg-[#D5B13A] text-black font-heading font-bold uppercase text-sm tracking-wider hover:bg-[#C1A561] transition-colors rounded"
                  >
                    Submit Application
                  </Button>
                </div>
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
   TEAM TILE COMPONENT — matches About page PassionTile
   ------------------------------------------------------- */

function TeamTile({ title, image }: { title: string; image: string }) {
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

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Text overlay - bottom aligned */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white">{title}</h4>
      </div>
    </div>
  )
}
