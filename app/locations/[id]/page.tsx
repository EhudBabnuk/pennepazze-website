import { getLocations, getLocationBySlug } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import LocationContent from "./location-content"

export const generateStaticParams = async () => {
  const locations = await getLocations()
  return locations.map((location) => ({ id: location.slug }))
}

export const metadata = {
  title: "Location | PennePazze",
  description: "Visit our restaurant location",
}

export default async function LocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const location = await getLocationBySlug(id)

  if (!location) {
    notFound()
  }

  const imageSrc = resolveImage(location.image as never, '/images/location-hero.jpg', 1200, 600)

  return <LocationContent location={{ ...location, imageSrc }} />
}
