import { locations } from "@/lib/locations"
import { notFound } from "next/navigation"
import LocationPageWrapper from "./location-page-wrapper"

export const generateStaticParams = async () => {
  return locations.map((location) => ({
    id: location.id,
  }))
}

export const metadata = {
  title: "Location | Penne Pazze",
  description: "Visit our restaurant location",
}

export default async function LocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const location = locations.find((l) => l.id === id)

  if (!location) {
    notFound()
  }

  return <LocationPageWrapper location={location} />
}
