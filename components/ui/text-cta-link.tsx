"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TextCTALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  defaultColor?: "primary" | "secondary-green" | "accent"
  arrow?: boolean
}

const TextCTALink = React.forwardRef<HTMLAnchorElement, TextCTALinkProps>(
  ({ className, defaultColor = "primary", arrow = true, children, ...props }, ref) => {
    const colorClasses = {
      primary: "text-primary hover:text-[#C1A561] focus-visible:text-[#C1A561]",
      "secondary-green": "text-[#D5B13A] hover:text-[#C1A561] focus-visible:text-[#C1A561]",
      accent: "text-accent hover:text-[#D5B13A] focus-visible:text-[#D5B13A]",
    }

    // If arrow is false and children is a React element, render as a full link wrapper
    if (!arrow && typeof children !== "string") {
      return (
        <Link
          ref={ref}
          className={cn(
            "block cursor-pointer transition-all duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D5B13A]",
            "hover:no-underline",
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
      <Link
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 font-heading font-bold uppercase text-sm tracking-wider",
          "cursor-pointer transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D5B13A]",
          colorClasses[defaultColor],
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {arrow && (
          <ArrowRight className="w-5 h-5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1" />
        )}
      </Link>
    )
  }
)

TextCTALink.displayName = "TextCTALink"

export { TextCTALink }
