"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Location {
  id: string | { current: string }
  name: string
  cateringLink?: string
}

interface CateringRequestFormProps {
  locations: Location[]
}

export function CateringRequestForm({ locations }: CateringRequestFormProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  function getLocationId(loc: Location): string {
    return typeof loc.id === 'object' && loc.id !== null
      ? (loc.id as { current: string }).current
      : String(loc.id)
  }

  const selectedLocation = selectedIndex !== null ? locations[selectedIndex] : null

  return (
    <div className="border border-[#E8E8E8] rounded-lg p-8 bg-[#FAFAFA]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Label className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">
            Select Location *
          </Label>
          <div className="flex flex-col md:flex-row gap-4">
            {locations.map((loc, index) => (
              <Button
                key={getLocationId(loc)}
                onClick={() => setSelectedIndex(index)}
                className={`flex-1 py-3 font-heading font-bold uppercase text-sm tracking-wider rounded-full transition-all ${
                  selectedIndex === index
                    ? "bg-[#D5B13A] text-black hover:bg-[#C1A561]"
                    : "bg-white text-[#D5B13A] border-2 border-[#D5B13A] hover:bg-[#D5B13A]/5"
                }`}
              >
                {loc.name}
              </Button>
            ))}
          </div>
        </div>

        {selectedLocation && selectedLocation.cateringLink ? (
          <div className="border border-[#E8E8E8] rounded-lg p-6 bg-white">
            <p className="text-[#999999] uppercase tracking-wider mb-6" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>
              Catering Request Form — {selectedLocation.name}
            </p>
            <iframe
              src={selectedLocation.cateringLink}
              width="100%"
              height="600"
              style={{ border: "none", borderRadius: "4px" }}
              title={`Catering Request Form — ${selectedLocation.name}`}
            />
          </div>
        ) : selectedLocation ? (
          <div className="border border-[#E8E8E8] rounded-lg p-12 bg-white text-center">
            <p className="text-[#999999]" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontSize: "1.125rem" }}>
              Catering link not configured for this location. Please contact us directly.
            </p>
          </div>
        ) : (
          <div className="border border-[#E8E8E8] rounded-lg p-12 bg-white text-center">
            <p className="text-[#999999]" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontSize: "1.125rem" }}>
              Please select a location above to proceed with your catering request.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
