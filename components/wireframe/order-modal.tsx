"use client"

import { ArrowLeft, MapPin, Clock, Truck, X } from "lucide-react"
import { useOrderModal } from "@/components/providers/order-modal-provider"
import { useState } from "react"

interface SanityLocation {
  slug: string
  id?: string
  name: string
  address?: string
  city?: string
  state?: string
  status?: string
  orderLink?: string
  orderLinkPickup?: string
  orderLinkDelivery?: string
}

interface OrderModalProps {
  locations: SanityLocation[]
}

type Step = "branch" | "orderType"
type OrderType = "pickup" | "delivery"

export function OrderModal({ locations }: OrderModalProps) {
  const { isOpen, closeModal } = useOrderModal()
  const [step, setStep] = useState<Step>("branch")
  const [selectedLocation, setSelectedLocation] = useState<SanityLocation | null>(null)

  const orderableLocations = locations.filter((l) => !l.status || l.status === 'open')

  const handleBranchSelect = (loc: SanityLocation) => {
    setSelectedLocation(loc)
    setStep("orderType")
  }

  const handleOrderTypeSelect = (type: OrderType) => {
    if (!selectedLocation) return
    const url = type === "pickup"
      ? (selectedLocation.orderLinkPickup ?? selectedLocation.orderLink)
      : (selectedLocation.orderLinkDelivery ?? selectedLocation.orderLink)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    handleClose()
  }

  const handleClose = () => {
    setStep("branch")
    setSelectedLocation(null)
    closeModal()
  }

  const handleBack = () => {
    setStep("branch")
    setSelectedLocation(null)
  }

  if (!isOpen) return null

  const headerTitle = step === "branch" ? "Select Location" : "Choose Delivery"

  const ModalContent = () => (
    <>
      {/* Gold header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "orderType" && (
              <button onClick={handleBack} className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors" aria-label="Go back">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <h2 className="text-xl font-bold text-white">{headerTitle}</h2>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {step === "branch" ? (
          <div className="space-y-3">
            <p className="text-sm text-primary font-semibold mb-5">Where would you like to order from?</p>
            {orderableLocations.map((loc) => {
              const id = loc.slug ?? loc.id ?? loc.name
              const displayAddress = loc.address ?? `${loc.city ?? ''}, ${loc.state ?? ''}`
              return (
                <button key={id} onClick={() => handleBranchSelect(loc)}
                  className="w-full p-4 bg-white border-2 border-accent/20 hover:border-accent hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-foreground text-base group-hover:text-accent transition-colors">{loc.name}</div>
                      <div className="text-sm text-foreground/60">{displayAddress}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-primary font-semibold mb-5">How would you like to receive your order?</p>
            <button onClick={() => handleOrderTypeSelect("pickup")}
              className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">Pickup</div>
                  <div className="text-sm text-foreground/60">Ready in 15–20 minutes</div>
                </div>
              </div>
            </button>
            <button onClick={() => handleOrderTypeSelect("delivery")}
              className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">Delivery</div>
                  <div className="text-sm text-foreground/60">Delivered to your address</div>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  )

  return (
    <>
      <div className="fixed inset-0 bg-foreground/50 z-40" onClick={handleClose} role="presentation" aria-hidden="true" />

      {/* Desktop Modal */}
      <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center pointer-events-none" role="dialog" aria-modal="true" aria-label={headerTitle}>
        <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
          <ModalContent />
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="flex md:hidden fixed inset-0 z-50 flex-col justify-end pointer-events-none" role="dialog" aria-modal="true">
        <div className="bg-secondary rounded-t-3xl pointer-events-auto max-h-[80vh] overflow-auto shadow-2xl">
          <div className="w-12 h-1.5 bg-foreground/20 rounded-full mx-auto mt-3 mb-0" aria-hidden="true" />
          <ModalContent />
        </div>
      </div>
    </>
  )
}
