"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { locations } from "@/lib/locations"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden border-b border-border">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/restaurant-dining.jpg"
              alt="Penne Pazze restaurant dining atmosphere"
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
            <h1 className="text-white mb-4">Get In Touch</h1>
          </div>
        </section>

        {/* Two-Column Section: Contact Form + Location Cards */}
        <section className="w-full py-16 md:py-24 bg-white border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left: Contact Form (2 columns on desktop) */}
              <div className="lg:col-span-2">
                <h2 className="text-foreground mb-8">Send Us a Message</h2>
                {submitted ? (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
                    <p
                      className="text-green-800"
                      style={{
                        fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-border rounded bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D5B13A] focus:border-transparent"
                        style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-border rounded bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D5B13A] focus:border-transparent"
                        style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-border rounded bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D5B13A] focus:border-transparent"
                        style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                      />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-border rounded bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#D5B13A] focus:border-transparent"
                        style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                      >
                        <option value="">Select a subject...</option>
                        <option value="reservation">Reservation</option>
                        <option value="catering">Catering Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="careers">Careers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="px-4 py-3 border border-border rounded bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D5B13A] focus:border-transparent resize-none"
                      style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                    />

                    <PrimaryCTAButton type="submit" className="w-full px-6 py-3 text-sm">
                      Send Message
                    </PrimaryCTAButton>
                  </form>
                )}
              </div>

              {/* Right: Quick Contact Info (1 column on desktop) */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-foreground mb-4">Direct Contacts</h3>
                  <div className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                        <Mail className="w-5 h-5 text-[#D5B13A]" />
                      </div>
                      <div>
                        <p
                          className="font-heading font-bold text-sm uppercase text-foreground mb-1"
                          style={{ letterSpacing: "0.05em" }}
                        >
                          Email
                        </p>
                        <a
                          href="mailto:info@pennepazze.com"
                          className="text-[#D5B13A] hover:text-[#C1A561] transition-colors"
                          style={{
                            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          info@pennepazze.com
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
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
                          href="tel:+13055550123"
                          className="text-[#D5B13A] hover:text-[#C1A561] transition-colors"
                          style={{
                            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          (305) 555-0123
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center shrink-0 mt-1">
                        <MapPin className="w-5 h-5 text-[#D5B13A]" />
                      </div>
                      <div>
                        <p
                          className="font-heading font-bold text-sm uppercase text-foreground mb-1"
                          style={{ letterSpacing: "0.05em" }}
                        >
                          Main Office
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{
                            fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: "0.9375rem",
                          }}
                        >
                          {locations[0].address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="text-foreground mb-4">Hours of Operation</h3>
                  <div
                    className="text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                    }}
                  >
                    <p>
                      <strong>Mon - Thu:</strong> 11am - 10pm
                    </p>
                    <p>
                      <strong>Fri - Sun:</strong> 11am - 11pm
                    </p>
                    <p className="mt-3 text-sm">*Hours may vary by location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Locations Section */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden border-b border-border">
          {/* Gold pasta pattern background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-Tk4xFeYoM8EmmtcldGxaSQJkzatpVv.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Subtle light overlay for text readability */}
          <div className="absolute inset-0 bg-white/75 pointer-events-none" />
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-foreground mb-4 text-center">Our Locations</h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto text-center mb-12"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1.125rem",
                lineHeight: 1.7,
              }}
            >
              Visit any of our locations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location) => (
                <a
                  key={location.id}
                  href={`/locations/${location.id}`}
                  className="group border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#D5B13A] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">{location.name}</h4>
                      <p
                        className="text-muted-foreground text-sm"
                        style={{
                          fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {location.city}, {location.state}
                      </p>
                    </div>
                    {location.featured && (
                      <span className="bg-[#D5B13A] text-black px-2 py-1 rounded text-xs font-heading font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  <p
                    className="text-muted-foreground text-sm mb-4"
                    style={{
                      fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {location.address}
                  </p>

                  <p
                    className="text-[#D5B13A] text-sm group-hover:text-[#C1A561] transition-colors"
                    style={{
                      fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    View Details →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
