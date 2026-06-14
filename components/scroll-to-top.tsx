"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * ScrollToTop Component
 * Automatically scrolls to top when the pathname changes (route navigation)
 * This ensures every page loads at the top consistently
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])

  return null
}
