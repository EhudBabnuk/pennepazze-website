import { getAboutPage, getLocations } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { LinkCTA } from "@/components/ui/link-cta"
import { ContactForm } from "@/components/sections/contact-form"
import Image from "next/image"

export default async function AboutPage() {
  const [pageData, locations] = await Promise.all([
    getAboutPage(),
    getLocations(),
  ])

  const heroImage = resolveImage(pageData?.heroImage as never, '/images/about-hero.jpg', 1600, 900)
  const beliefs = pageData?.beliefsSection ?? {}
  const beliefItems: string[] = beliefs.items ?? [
    'Fresh pasta and sauces made in-house, every single day',
    'No artificial ingredients — ever',
    'No preservatives, no seed oils — not now, not ever',
  ]

  return (
    <>
      {/* 1) HERO */}
      <section className="relative w-full overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="PennePazze restaurant interior ambiance" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px] md:min-h-[450px] lg:min-h-[500px] px-4 text-center gap-4">
          <h1 className="text-white">{pageData?.heroHeading ?? "We're a Little Crazy About Italian Food."}</h1>
          {pageData?.heroSubheading && (
            <p className="text-white/80 max-w-2xl" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
              {pageData.heroSubheading}
            </p>
          )}
        </div>
      </section>

      {/* 2) OUR STORY */}
      <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-foreground mb-4">{pageData?.originStory?.heading ?? 'From Our Family to Your Table.'}</h2>
            <div className="flex flex-col gap-5 max-w-3xl">
              {(pageData?.originStory?.paragraphs ?? [
                'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life.',
                'Our founder Rony comes from a family rooted in northern Italy, where food is culture, family, and identity.',
                'We brought our head chef over from Sicily — along with his family recipes, his technique, and everything that makes Italian cooking what it is.',
              ]).map((para: string, i: number) => (
                <p key={i} className="text-muted-foreground" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Beliefs grid - image tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality', text: beliefItems[0] ?? 'Fresh pasta and sauces made in-house, every single day.', image: '/images/about-quality.jpg' },
              { title: 'Passion', text: beliefItems[1] ?? 'No artificial ingredients — ever.', image: '/images/about-passion.jpg' },
              { title: 'Tradition', text: beliefItems[2] ?? 'No preservatives, no seed oils — not now, not ever.', image: '/images/about-tradition.jpg' },
            ].map((tile, index) => (
              <div key={tile.title} className={index === 1 ? "md:translate-y-10" : ""}>
                <PassionTile title={tile.title} text={tile.text} image={tile.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) LOCATIONS */}
      <section id="locations" className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-12 md:mb-16">Our Locations</h2>
          <div className="flex flex-col gap-16 md:gap-20">
            {locations.filter((l) => l.status === 'open').map((location) => {
              const locSlug = location.slug
              const locImage = resolveImage(location.image as never, '/placeholder.jpg', 800, 533)
              const hours = location.hours ?? {}
              const hoursLines = [hours.weekdays, hours.notes].filter(Boolean)
              return (
                <div key={locSlug} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden bg-[#D5B13A]/20">
                      <Image src={locImage} alt={`${location.name} restaurant location`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-foreground mb-6">{location.name}</h3>
                    <div className="flex flex-col gap-5">
                      {location.address && (
                        <div>
                          <p className="subtitle-3 text-[#C1A561] mb-1">Address</p>
                          <p className="text-foreground" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem", lineHeight: 1.6 }}>{location.address}</p>
                        </div>
                      )}
                      {location.phone && (
                        <div>
                          <p className="subtitle-3 text-[#C1A561] mb-1">Phone</p>
                          <a href={`tel:${location.phone}`} className="text-foreground hover:text-[#D5B13A] transition-colors" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem" }}>{location.phone}</a>
                        </div>
                      )}
                      {hoursLines.length > 0 && (
                        <div>
                          <p className="subtitle-3 text-[#C1A561] mb-1">Hours</p>
                          {hoursLines.map((hour, idx: number) => (
                            <p key={idx} className="text-foreground" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.7 }}>{hour}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <LinkCTA href={`/locations/${locSlug}`}>Learn More</LinkCTA>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4) CONTACT */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-ZT1M85llWCS3lRznZpCUrzMylFRLYm.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="absolute inset-0 bg-[#F7F2DE]/70 pointer-events-none" />
        <div className="w-full max-w-2xl mx-auto px-4 md:px-8 relative z-10">
          <h2 className="text-foreground mb-3">Contact Us</h2>
          <p className="text-muted-foreground mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem", lineHeight: 1.6 }}>
            Have a question? We&apos;d love to hear from you.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}

function PassionTile({ title, text, image }: { title: string; text: string; image: string }) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white mb-2">{title}</h4>
        <p className="text-white/85 max-w-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.6 }}>
          {text}
        </p>
      </div>
    </div>
  )
}
