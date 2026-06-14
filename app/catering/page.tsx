import { getCateringPage, getCateringBenefits, getLocations } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { CateringRequestForm } from "@/components/sections/catering-request-form"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Briefcase, PartyPopper, Heart, Users, ChefHat, Truck, type LucideIcon } from "lucide-react"
import Image from "next/image"

const iconMap: Record<string, LucideIcon> = {
  Briefcase, PartyPopper, Heart, Users, ChefHat, Truck,
}

export default async function CateringPage() {
  const [pageData, benefits, locations] = await Promise.all([
    getCateringPage(),
    getCateringBenefits(),
    getLocations(),
  ])

  const heroImage = resolveImage(pageData?.heroImage as never, '/images/catering-hero.jpg', 1200, 800)
  const offeringsSection = pageData?.offeringsSection ?? {}
  const formSection = pageData?.formSection ?? {}

  const offeringItems = offeringsSection.offerings ?? benefits.map((b: { _id?: string; icon?: string; title: string; description?: string }) => b)

  return (
    <>
      {/* HERO — 50/50 Split */}
      <section className="w-full border-b border-[#E8E8E8]">
        <div className="flex flex-col lg:flex-row min-h-[50vh] lg:min-h-[70vh]">
          <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-0">
            <Image src={heroImage} alt="Premium Italian catering spread with beautifully plated dishes" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="w-full lg:w-1/2 bg-[#FAFAFA] flex items-center">
            <div className="w-full max-w-xl px-8 md:px-12 lg:px-16 py-16 lg:py-24">
              <h1 className="text-foreground mb-3">{pageData?.heroHeading ?? 'Catering & Events'}</h1>
              <p className="subtitle-2 text-[#C1A561] mb-6">{pageData?.heroSubheading ?? 'We love being part of your special moments.'}</p>
              <p className="body-text text-foreground mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}>
                {pageData?.heroBody ?? 'Fresh, authentic Italian food your guests will not forget. From weddings to private dinners to corporate lunches — we bring the PennePazze experience to you.'}
              </p>
              <PrimaryCTAButton
                onClick={undefined}
                className="px-8 py-3"
                aria-label="Scroll to catering request form"
                asChild
              >
                <a href="#request-catering">Request Catering</a>
              </PrimaryCTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer — Black bg */}
      <section className="w-full py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-WgtbyLqGOpHZhilNb6G49pxuwbPeAh.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-white mb-3">{offeringsSection.heading ?? 'What We Can Do For You'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offeringItems.map((item: { _key?: string; _id?: string; icon?: string; title: string; body?: string; description?: string }, index: number) => {
              const Icon = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Briefcase
              const text = item.body ?? item.description
              return (
                <div key={item._key ?? item._id ?? index} className="bg-[#272727] border border-[#C1A561]/40 rounded-lg p-8 flex flex-col items-start gap-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D5B13A] hover:shadow-[0_4px_24px_rgba(213,177,58,0.15)]">
                  <div className="w-12 h-12 rounded-full bg-[#D5B13A]/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#D5B13A]" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-white">{item.title}</h4>
                  {text && (
                    <p className="text-[#F7F2DE]/70" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.625 }}>
                      {text}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Catering Request Form */}
      <section id="request-catering" className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-3">{formSection.heading ?? "Let's Talk"}</h2>
          <p className="text-[#999999] mb-12" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem", lineHeight: 1.625 }}>
            {formSection.subheading ?? 'Have a question? Planning an event? We are here for you.'}
          </p>
          <CateringRequestForm locations={locations.map(l => ({ id: l.slug, name: l.name, cateringLink: undefined }))} />
        </div>
      </section>
    </>
  )
}
