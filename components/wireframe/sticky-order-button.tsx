"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import Link from "next/link"

interface StickyOrderButtonProps {
  onClick: () => void
}

export function StickyOrderButton({ onClick }: StickyOrderButtonProps) {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-accent border-t-2 border-primary"
      role="region"
      aria-label="Sticky order buttons"
      aria-live="polite"
    >
      <div className="flex gap-3 items-center justify-center">
        <Button
          asChild
          className="flex-1 h-12 text-base bg-[#D5B13A] text-black font-heading font-bold uppercase hover:bg-[#C1A561] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5B13A]"
          aria-label="Go to catering page"
        >
          <Link href="/catering">
            Catering
          </Link>
        </Button>
        <PrimaryCTAButton
          onClick={onClick}
          className="flex-1 h-12 text-base"
          aria-label="Tap to open order form"
        >
          Order Now
        </PrimaryCTAButton>
      </div>
    </div>
  )
}
