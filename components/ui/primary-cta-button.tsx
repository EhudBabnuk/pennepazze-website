"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PrimaryCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

const PrimaryCTAButton = React.forwardRef<HTMLButtonElement, PrimaryCTAButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const baseStyles = cn(
      "bg-[#D5B13A] text-black font-heading font-bold text-sm uppercase tracking-wide px-6 py-3 leading-normal",
      "hover:bg-[#C1A561]",
      "transition-colors duration-300 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5B13A]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )

    if (asChild) {
      return (
        <Button asChild ref={ref} className={baseStyles} {...props}>
          {props.children}
        </Button>
      )
    }

    return (
      <Button ref={ref} className={baseStyles} {...props}>
        {props.children}
      </Button>
    )
  }
)

PrimaryCTAButton.displayName = "PrimaryCTAButton"

export { PrimaryCTAButton }
