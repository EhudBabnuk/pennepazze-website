import { getHomePage, getUpdatesSlides } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { UpdatesCarousel } from "@/components/wireframe/updates-carousel"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { InstagramFeed } from "@/components/wireframe/instagram-feed"
import { HeroScrollButton } from "@/components/sections/hero-scroll-button"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const [pageData, slides] = await Promise.all([
    getHomePage(),
    getUpdatesSlides(),
  ])

  const heroVideoUrl = pageData?.heroVideoUrl || 'https://player.vimeo.com/video/750022321?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0'
  const authenticity = pageData?.authenticityStrip ?? {}
  const storyTeaser = pageData?.storyTeaser ?? {}

  return (
    <>
      {/* Full-Bleed Video Hero */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden h-[75svh] md:h-[85svh]">
        <div className="hero-media">
          <iframe
            src={heroVideoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            title="PennePazze restaurant ambiance video"
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "max(100vw, calc(100svh * 16 / 9))",
              height: "max(100svh, calc(100vw * 9 / 16))",
              minWidth: "100%", minHeight: "100%", border: "0", pointerEvents: "none",
            }}
          />
          <div className="absolute inset-0 bg-black/30 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[2]" />
        </div>
        <div className="hero-content h-full flex items-end justify-center pb-10 md:pb-12">
          <HeroScrollButton />
        </div>
      </section>

      {/* Explore Our Offerings — static navigation tiles */}
      <section id="content" className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-foreground mb-3">Explore Our Offerings</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
              Crazy good Italian, made fresh daily
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Our Menu', description: 'Fresh pasta rolled daily. House-made sauces. Roman pinsa. Zero seed oils — from day one.', href: '/menu', buttonLabel: 'View Menu', imageFallback: '/images/tile-menu.jpg' },
              { title: 'Catering', description: 'We bring PennePazze to your event — from boxed lunches to full Italian spreads.', href: '/catering', buttonLabel: 'Learn More', imageFallback: '/images/tile-catering.jpg' },
              { title: 'About Us', description: 'The story behind PennePazze — from Italy to Nashville, with no compromises.', href: '/about', buttonLabel: 'Read More', imageFallback: '/images/tile-about.jpg' },
            ].map((tile, index) => (
              <div key={tile.title} className={index === 1 ? "md:translate-y-10" : ""}>
                <OfferingTile
                  title={tile.title}
                  description={tile.description}
                  image={tile.imageFallback}
                  href={tile.href}
                  buttonLabel={tile.buttonLabel}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authenticity Strip */}
      <section className="w-full py-16 md:py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-GGDrpMph7Hcr7wBG5VtQJmhOnPVZNH.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-[#D5B13A] mb-4 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em" }}>
            {authenticity.preText ?? 'PennePazze has always been'}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, lineHeight: 1.2, fontStyle: "italic" }}>
            {authenticity.mainText ?? '100% Seed Oil Free. From Day One.'}
          </h2>
          {authenticity.body && (
            <p className="max-w-3xl mx-auto mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.8, color: "#F7F2DE" }}>
              {authenticity.body}
            </p>
          )}
          <p className="text-[#F7F2DE] mb-2" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "0.9375rem" }}>
            {authenticity.signatureFrom ?? 'With love,'}
          </p>
          <p className="text-white font-heading font-bold text-lg" style={{ fontSize: "1.125rem", letterSpacing: "0.025em" }}>
            {authenticity.signatureName ?? 'The PennePazze Family'}
          </p>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Updates & Highlights Carousel */}
      <UpdatesCarousel slides={slides} />

      {/* Story Teaser */}
      <section className="w-full py-16 md:py-24 bg-secondary border-t border-border">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg h-80 md:h-96 relative bg-gradient-to-br from-[#D5B13A] to-[#C1A561] flex items-center justify-center">
                {storyTeaser.image ? (
                  <Image
                    src={resolveImage(storyTeaser.image as never, '')}
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <span className="text-white/60 text-sm">Restaurant Interior Image</span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-6">
                {storyTeaser.heading ?? 'From Our Family to Your Table.'}
              </h2>
              {storyTeaser.body && (
                <p className="text-lg text-foreground mb-6 leading-relaxed">{storyTeaser.body}</p>
              )}
              <PrimaryCTAButton asChild className="px-8 py-3">
                <Link href="/about">{storyTeaser.linkText ?? 'Read Our Full Story'}</Link>
              </PrimaryCTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function OfferingTile({ title, description, image, href, buttonLabel }: {
  title: string; description: string; image: string; href: string; buttonLabel: string
}) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white mb-2">{title}</h4>
        <p className="text-[#F7F2DE]/85 mb-5 max-w-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.6 }}>
          {description}
        </p>
        <Link href={href}
          className="inline-flex items-center justify-center rounded px-6 py-3 uppercase tracking-wide leading-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5B13A] bg-[#D5B13A] text-black hover:bg-[#C1A561]"
          style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>
          {buttonLabel}
        </Link>
      </div>
    </div>
  )
}
