import { getGelatoPage } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import Image from "next/image"
import Link from "next/link"

export default async function GelatoPazzoPage() {
  const pageData = await getGelatoPage()

  const heroImage = resolveImage(pageData?.heroImage as never, '/images/gelato-hero.jpg', 1200, 800)
  const differentiators = pageData?.differentiators ?? {}
  const openNow = pageData?.openNowSection ?? {}

  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="Gelato Pazzo — fresh Italian gelato" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[450px] md:min-h-[550px] px-4 gap-4">
          <h1 className="text-white">{pageData?.heroHeading ?? 'Gelato Pazzo'}</h1>
          <p className="subtitle-1 text-[#D5B13A]">{pageData?.heroSubheading ?? 'Crazy Good Italian Gelato.'}</p>
          {pageData?.heroBody && (
            <p className="text-white/80 max-w-2xl" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1.125rem", lineHeight: 1.7 }}>
              {pageData.heroBody}
            </p>
          )}
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-12 text-center">{differentiators.heading ?? 'What Makes It Different'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(differentiators.items ?? [
              { _key: 'd1', title: 'Made In-House Daily', body: 'Every batch is made fresh on-site — not brought in pre-made.' },
              { _key: 'd2', title: 'Clean Ingredients', body: 'No seed oils. No artificial colors or flavors. Quality dairy, real fruit.' },
              { _key: 'd3', title: 'Authentically Italian', body: 'More flavor, less fat. We respect the craft and learned it the right way.' },
            ]).map((item: { _key?: string; title: string; body: string }) => (
              <div key={item._key ?? item.title} className="bg-[#FAFAFA] border border-border rounded-lg p-8 flex flex-col gap-4 hover:border-[#D5B13A] hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-[#D5B13A]/15 flex items-center justify-center">
                  <span className="text-[#D5B13A] font-heading font-bold text-xl">✦</span>
                </div>
                <h4 className="text-foreground">{item.title}</h4>
                <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.625 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Now CTA */}
      <section className="w-full py-16 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-GGDrpMph7Hcr7wBG5VtQJmhOnPVZNH.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="w-full max-w-2xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-white mb-4">{openNow.heading ?? 'Now Open'}</h2>
          {openNow.address && (
            <p className="text-[#F7F2DE]/80 mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1rem" }}>
              {openNow.address}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {openNow.externalUrl ? (
              <PrimaryCTAButton asChild className="px-8 py-3">
                <a href={openNow.externalUrl} target="_blank" rel="noopener noreferrer">
                  {openNow.buttonLabel ?? 'VISIT GELATO PAZZO'}
                </a>
              </PrimaryCTAButton>
            ) : (
              <PrimaryCTAButton asChild className="px-8 py-3">
                <Link href="/locations">{openNow.buttonLabel ?? 'FIND A LOCATION'}</Link>
              </PrimaryCTAButton>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
