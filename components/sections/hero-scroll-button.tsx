"use client"

import { ChevronDown } from "lucide-react"

export function HeroScrollButton() {
  const scrollToContent = () => {
    const el = document.getElementById("content")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToContent}
      className="flex flex-col items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B13A] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
      aria-label="Scroll down to content"
    >
      <span className="text-white/70 text-sm md:text-base tracking-widest uppercase group-hover:text-white/90 transition-colors duration-300"
        style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500 }}>
        scroll down
      </span>
      <span className="w-12 h-12 rounded-full border-2 border-[#C1A561] flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:bg-[#D5B13A]/20 group-hover:border-[#D5B13A] transition-all duration-300">
        <ChevronDown className="w-6 h-6 text-[#C1A561] group-hover:text-[#D5B13A] group-hover:translate-y-0.5 transition-all duration-300" />
      </span>
    </button>
  )
}
