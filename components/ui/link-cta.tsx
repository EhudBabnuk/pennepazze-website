"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LinkCTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  wrapper?: boolean
}

const LinkCTA = React.forwardRef<HTMLAnchorElement, LinkCTAProps>(
  ({ className, wrapper = false, children, ...props }, ref) => {
    // Wrapper mode: full block link for card CTAs
    if (wrapper && typeof children !== "string") {
      return (
        <Link
          ref={ref}
          className={cn(
            "block cursor-pointer transition-all duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D5B13A] focus-visible:rounded",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      )
    }

    // Standard text link with arrow
    return (
      <span className="group inline-flex items-center gap-2 cursor-pointer">
        <Link
          ref={ref}
          className={cn(
            "inline-flex items-center gap-2 font-heading font-bold uppercase text-sm tracking-wider",
            "text-[#D5B13A]",
            "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D5B13A] focus-visible:rounded",
            className
          )}
          {...props}
        >
          <span className="transition-colors duration-200 ease-in-out group-hover:text-[#C1A561] group-focus-visible:text-[#C1A561]">
            {children}
          </span>
          <ArrowRight className="w-5 h-5 transition-colors transition-transform duration-200 ease-in-out transform group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px] group-hover:text-[#C1A561] group-focus-visible:text-[#C1A561]" />
        </Link>
      </span>
    )
  }
)

LinkCTA.displayName = "LinkCTA"

export { LinkCTA }
