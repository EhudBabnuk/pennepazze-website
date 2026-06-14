"use client"

import { useState } from "react"
import { X, ArrowLeft, MapPin, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "branch" | "orderType"
type Branch = "A" | "B" | null
type OrderType = "pickup" | "delivery" | null

// External URLs for each branch + order type combination
const orderUrls: Record<string, string> = {
  "A-pickup": "https://example.com/branch-a/pickup",
  "A-delivery": "https://example.com/branch-a/delivery",
  "B-pickup": "https://example.com/branch-b/pickup",
  "B-delivery": "https://example.com/branch-b/delivery",
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [step, setStep] = useState<Step>("branch")
  const [selectedBranch, setSelectedBranch] = useState<Branch>(null)

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch)
    setStep("orderType")
  }

  const handleOrderTypeSelect = (type: OrderType) => {
    if (selectedBranch && type) {
      const url = orderUrls[`${selectedBranch}-${type}`]
      // In a real app, this would redirect to the external ordering system
      alert(`[Wireframe] Would redirect to: ${url}`)
      handleClose()
    }
  }

  const handleClose = () => {
    setStep("branch")
    setSelectedBranch(null)
    onClose()
  }

  const handleBack = () => {
    setStep("branch")
    setSelectedBranch(null)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-40"
        onClick={handleClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Desktop Modal */}
      <div 
        className="hidden md:flex fixed inset-0 z-50 items-center justify-center pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent overflow-hidden">
          {/* Header Background */}
          <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === "orderType" && (
                  <button 
                    onClick={handleBack} 
                    className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors"
                    aria-label="Go back to branch selection"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <h2 className="text-xl font-bold text-white" id="order-modal-title">
                  {step === "branch" ? "Select Location" : "Choose Delivery"}
                </h2>
              </div>
              <button 
                onClick={handleClose}
                className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors"
                aria-label="Close order form"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">

          {step === "branch" ? (
            <div className="space-y-3">
              <p className="text-sm text-primary font-semibold mb-5" id="branch-description">
                Where would you like to order from?
              </p>
              <button
                onClick={() => handleBranchSelect("A")}
                className="w-full p-4 bg-white border-2 border-accent/20 hover:border-accent hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-describedby="branch-description"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-accent transition-colors">123 Main Street</div>
                    <div className="text-sm text-foreground/60">Charlotte, NC 28202</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleBranchSelect("B")}
                className="w-full p-4 bg-white border-2 border-accent/20 hover:border-accent hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-describedby="branch-description"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-accent transition-colors">456 Oak Avenue</div>
                    <div className="text-sm text-foreground/60">Uptown, NC 28202</div>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-primary font-semibold mb-5" id="order-type-description">
                How would you like to receive your order?
              </p>
              <button
                onClick={() => handleOrderTypeSelect("pickup")}
                className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="order-type-description"
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">Pickup</div>
                    <div className="text-sm text-foreground/60">Ready in 15-20 minutes</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleOrderTypeSelect("delivery")}
                className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="order-type-description"
              >
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
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div 
        className="flex md:hidden fixed inset-0 z-50 flex-col justify-end pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-order-modal-title"
      >
        <div className="bg-secondary rounded-t-3xl p-6 pointer-events-auto max-h-[80vh] overflow-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent shadow-2xl">
          <div className="w-12 h-1.5 bg-foreground/20 rounded-full mx-auto mb-6" aria-hidden="true" />

          {/* Header Background */}
          <div className="bg-gradient-to-r from-primary to-primary/90 -mx-6 -mt-6 px-6 py-4 mb-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === "orderType" && (
                  <button 
                    onClick={handleBack} 
                    className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors"
                    aria-label="Go back to branch selection"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <h2 className="text-xl font-bold text-white" id="mobile-order-modal-title">
                  {step === "branch" ? "Select Location" : "Choose Delivery"}
                </h2>
              </div>
              <button 
                onClick={handleClose}
                className="p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-lg transition-colors"
                aria-label="Close order form"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {step === "branch" ? (
            <div className="space-y-3">
              <p className="text-sm text-primary font-semibold mb-5" id="mobile-branch-description">
                Where would you like to order from?
              </p>
              <button
                onClick={() => handleBranchSelect("A")}
                className="w-full p-4 bg-white border-2 border-accent/20 hover:border-accent hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-describedby="mobile-branch-description"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-accent transition-colors">123 Main Street</div>
                    <div className="text-sm text-foreground/60">Charlotte, NC 28202</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleBranchSelect("B")}
                className="w-full p-4 bg-white border-2 border-accent/20 hover:border-accent hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-describedby="mobile-branch-description"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-accent transition-colors">456 Oak Avenue</div>
                    <div className="text-sm text-foreground/60">Uptown, NC 28202</div>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-primary font-semibold mb-5" id="mobile-order-type-description">
                How would you like to receive your order?
              </p>
              <button
                onClick={() => handleOrderTypeSelect("pickup")}
                className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="mobile-order-type-description"
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">Pickup</div>
                    <div className="text-sm text-foreground/60">Ready in 15-20 minutes</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleOrderTypeSelect("delivery")}
                className="w-full p-4 bg-white border-2 border-primary/20 hover:border-primary hover:shadow-md transition-all rounded-xl text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="mobile-order-type-description"
              >
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
      </div>
    </>
  )
}
