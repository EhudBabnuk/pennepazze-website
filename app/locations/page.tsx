import { getLocations } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { LocationStatusBadge } from "@/components/ui/location-status-badge"
import Image from "next/image"
import Link from "next/link"

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <>
      <section className="w-full py-16 md:py-24 bg-white border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-foreground mb-4">Our Locations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
            Nashville. Murfreesboro. And growing. Find hours, contact information, and directions below.
          </p>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-[#FAFAFA] border-b border-border">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location) => {
              const locSlug = location.slug
              const imgSrc = resolveImage(location.image as never, '', 600, 300)
              const hours = location.hours ?? {}
              const isOpen = location.status === 'open'
              return (
                <Link href={`/locations/${locSlug}`} key={locSlug}>
                  <div className="group border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-[#D5B13A] transition-all duration-200 cursor-pointer flex flex-col h-full bg-white">
                    <div className="relative h-48 bg-gradient-to-br from-[#D5B13A]/20 to-black/10">
                      {imgSrc ? (
                        <Image src={imgSrc} alt={location.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-[#D5B13A]/40 font-heading font-bold text-lg uppercase" style={{ letterSpacing: "0.1em" }}>{location.name}</p>
                        </div>
                      )}
                      {!isOpen && (
                        <div className="absolute top-3 left-3">
                          <LocationStatusBadge
                            status={location.status}
                            className="bg-white/90 backdrop-blur-sm shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-foreground leading-tight">{location.name}</h3>
                        <LocationStatusBadge status={location.status} />
                      </div>
                      <p className="text-muted-foreground text-sm mb-4" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                        {location.city}{location.state ? `, ${location.state}` : ''}
                      </p>
                      <div className="flex-1 flex flex-col gap-3 mb-6">
                        {location.phone && (
                          <span className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>{location.phone}</span>
                        )}
                        {location.address && (
                          <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, lineHeight: 1.6 }}>{location.address}</p>
                        )}
                        {hours.weekdays && (
                          <div>
                            <p className="text-muted-foreground text-xs mb-1" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Hours</p>
                            <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                              {hours.weekdays}
                            </p>
                          </div>
                        )}
                        {location.openingNote && (
                          <p className="text-[#D5B13A] text-sm italic" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400 }}>
                            {location.openingNote}
                          </p>
                        )}
                      </div>
                      <p className="text-[#D5B13A] group-hover:text-[#C1A561] transition-colors text-sm" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.05em" }}>
                        View Details →
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
