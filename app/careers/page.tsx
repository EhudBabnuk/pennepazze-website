import { getCareersPage, getCareerRoles } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { CareersForm } from "@/components/sections/careers-form"
import { ChefHat, HandPlatter, Truck, UserCog, type LucideIcon } from "lucide-react"
import Image from "next/image"

const deptIconMap: Record<string, LucideIcon> = {
  Kitchen: ChefHat,
  Service: HandPlatter,
  Delivery: Truck,
  Management: UserCog,
}

export default async function CareersPage() {
  const [pageData, roles] = await Promise.all([
    getCareersPage(),
    getCareerRoles(),
  ])

  const heroImage = resolveImage(pageData?.heroImage as never, '/images/careers-hero.jpg', 1600, 900)
  const introSection = pageData?.introSection ?? {}
  const benefitsSection = pageData?.benefitsSection ?? {}
  const openPositionsSection = pageData?.openPositionsSection ?? {}
  const formSection = pageData?.formSection ?? {}

  const teamTiles = [
    { title: 'Kitchen Team', image: resolveImage((pageData as any)?.kitchenTeamImage, '/images/team-kitchen.jpg', 600, 600) },
    { title: 'Service Team', image: resolveImage((pageData as any)?.serviceTeamImage, '/images/team-service.jpg', 600, 600) },
    { title: 'Delivery Team', image: resolveImage((pageData as any)?.deliveryTeamImage, '/images/team-delivery.jpg', 600, 600) },
  ]

  return (
    <>
      {/* 1) HERO */}
      <section className="relative w-full overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="PennePazze restaurant kitchen ambiance" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[350px] md:min-h-[450px] lg:min-h-[500px] px-4">
          <h1 className="text-white mb-4">{pageData?.heroHeading ?? 'Come Work With Us'}</h1>
          {pageData?.heroSubheading && (
            <p className="text-white/80 max-w-2xl" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.6 }}>
              {pageData.heroSubheading}
            </p>
          )}
        </div>
      </section>

      {/* 2) JOIN THE FAMILY */}
      <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-foreground mb-4">{introSection.heading ?? 'Join the PennePazze Family'}</h2>
            <p className="text-muted-foreground max-w-3xl" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
              {introSection.body ?? 'PennePazze is not just a job. It is a place where the team actually cares — about the food, the guests, and each other.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamTiles.map((tile, index) => (
              <div key={tile.title} className={index === 1 ? "md:translate-y-10" : ""}>
                <TeamTile title={tile.title} image={tile.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) OPEN POSITIONS / ROLES */}
      <section className="w-full py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-2-aEGVmB8Z3hSEY2VvbgeSPwBfPPMG1V.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="mb-12 md:mb-16">
            <h2 className="text-white mb-4">{openPositionsSection.heading ?? 'Open Positions'}</h2>
            {openPositionsSection.defaultMessage && (
              <p className="text-[#F7F2DE] max-w-2xl" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
                {openPositionsSection.defaultMessage}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((roleGroup: { department: string; roles: string[] }) => {
              const Icon = deptIconMap[roleGroup.department] ?? ChefHat
              return (
                <div key={roleGroup.department} className="bg-[#272727] border border-[#C1A561]/40 rounded-lg p-8 flex flex-col gap-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D5B13A] hover:shadow-[0_4px_24px_rgba(213,177,58,0.15)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D5B13A]/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D5B13A]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white" style={{ fontSize: "1.25rem", letterSpacing: "0.025em" }}>{roleGroup.department}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5 pl-1">
                    {roleGroup.roles.map((role) => (
                      <li key={role} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5B13A] shrink-0" />
                        <span className="text-[#F7F2DE]/70" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.5 }}>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4) APPLICATION FORM */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
          <h2 className="text-foreground mb-3">{formSection.heading ?? 'Apply Now'}</h2>
          <p className="text-muted-foreground mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem", lineHeight: 1.6 }}>
            Ready to join PennePazze? Submit your application below.
          </p>
          <CareersForm />
        </div>
      </section>
    </>
  )
}

function TeamTile({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden group">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h4 className="text-white">{title}</h4>
      </div>
    </div>
  )
}
