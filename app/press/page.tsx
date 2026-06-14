"use client"

import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import Image from "next/image"

// Placeholder press articles data
const pressArticles = [
  {
    id: 1,
    image: "/images/updates-new-dish.jpg",
    logo: "LOGO",
    headline: "Penne Pazze Brings Authentic Italian Flavor to the City",
    date: "October 30, 2025",
    link: "#",
  },
  {
    id: 2,
    image: "/images/updates-special.jpg",
    logo: "LOGO",
    headline: "Why Penne Pazze Is Becoming a Local Favorite",
    date: "October 29, 2025",
    link: "#",
  },
  {
    id: 3,
    image: "/images/updates-coming-soon.jpg",
    logo: "LOGO",
    headline: "A Fresh Take on Italian Dining and Hospitality",
    date: "October 27, 2025",
    link: "#",
  },
  {
    id: 4,
    image: "/images/tile-menu.jpg",
    logo: "LOGO",
    headline: "Inside the Story of Penne Pazze",
    date: "October 24, 2025",
    link: "#",
  },
  {
    id: 5,
    image: "/images/tile-catering.jpg",
    logo: "LOGO",
    headline: "The Restaurant Redefining Casual Italian Cuisine",
    date: "October 20, 2025",
    link: "#",
  },
  {
    id: 6,
    image: "/images/tile-about.jpg",
    logo: "LOGO",
    headline: "Penne Pazze Expands Its Culinary Vision",
    date: "October 18, 2025",
    link: "#",
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section with Gold Pasta Pattern */}
        <section className="w-full py-24 md:py-32 relative overflow-hidden">
          {/* Gold pasta pattern background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-CGiBKakNTjy4zp1JzSy0pivPokE7LA.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-[#E8D4A0]/30" />

          <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center">
              <h1
                className="mb-6"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  color: "#1a1a1a",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Press & Media
              </h1>
              <p
                className="max-w-2xl mx-auto"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: "#333",
                }}
              >
                Read about Penne Pazze in the press. For media inquiries, contact us at{" "}
                <a
                  href="mailto:press@pennepazze.com"
                  className="text-[#8B6914] hover:underline"
                >
                  press@pennepazze.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Press Articles Grid */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressArticles.map((article) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image container with logo overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.headline}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Logo overlay box */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/85 backdrop-blur-sm px-8 py-4 rounded shadow-sm">
                        <span
                          style={{
                            fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                            color: "#666",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                          }}
                        >
                          {article.logo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-6">
                    <h3
                      className="mb-3 group-hover:text-[#D5B13A] transition-colors"
                      style={{
                        fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        lineHeight: 1.3,
                        color: "#1a1a1a",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {article.headline}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "#888",
                      }}
                    >
                      {article.date}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="w-full py-16 md:py-24 bg-[#1a1a1a]">
          <div className="w-full max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              For Media Inquiries
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#F7F2DE",
              }}
            >
              Have a story idea or need more information about Penne Pazze? Contact our media relations team.
            </p>
            <a
              href="mailto:press@pennepazze.com"
              className="inline-block bg-[#D5B13A] text-black px-8 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded hover:bg-[#C1A561] transition-colors"
            >
              press@pennepazze.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
