"use client"

import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { Location } from "@/lib/locations"
import LocationContent from "./location-content"

interface LocationPageWrapperProps {
  location: Location
}

export default function LocationPageWrapper({ location }: LocationPageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => {}} />
      <LocationContent location={location} />
      <Footer />
    </div>
  )
}
