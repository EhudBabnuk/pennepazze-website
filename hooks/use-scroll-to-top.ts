import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook to scroll to top on route changes
 * Runs when the pathname changes to ensure page loads at top
 */
export function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])
}
