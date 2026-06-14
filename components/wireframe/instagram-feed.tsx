"use client"

import { useRef, useState } from "react"
import { Instagram } from "lucide-react"

const feedItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Post ${i + 1}`,
}))

export function InstagramFeed() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scroll = (index: number) => {
    if (scrollRef.current) {
      const scrollAmount = index * 200
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
      setCurrentIndex(index)
    }
  }

  return (
    <section className="py-12 md:py-16 border-t-2 border-dashed border-foreground/30">
      <div className="px-4 md:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Instagram className="w-6 h-6" aria-hidden="true" />
          <h2 className="text-xl font-medium text-foreground">Instagram Feed Widget</h2>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-8">
          [Instagram Feed - Connect to display live posts]
        </p>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-4 max-w-5xl mx-auto" role="region" aria-label="Instagram feed">
          {feedItems.map((item) => (
            <a
              key={item.id}
              href={`https://instagram.com/p/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square border-2 border-dashed border-foreground/50 flex items-center justify-center bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-md hover:bg-muted/80 transition-colors"
              aria-label={`Instagram post ${item.id}`}
            >
              <div className="text-center">
                <Instagram className="w-8 h-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">
                  [Image Placeholder]
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="region"
            aria-label="Instagram feed carousel"
          >
            {feedItems.map((item) => (
              <a
                key={item.id}
                href={`https://instagram.com/p/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-40 aspect-square border-2 border-dashed border-foreground/50 flex items-center justify-center bg-muted snap-start focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-md hover:bg-muted/80 transition-colors"
                aria-label={`Instagram post ${item.id}`}
              >
                <div className="text-center">
                  <Instagram className="w-6 h-6 mx-auto mb-1 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">
                    [Image]
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {feedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => scroll(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
                className={`w-3 h-3 rounded-full border-2 border-dashed border-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground ${
                  currentIndex === index
                    ? "bg-foreground"
                    : "bg-transparent hover:bg-foreground/30"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Swipe or tap dots to see more
          </p>
        </div>
      </div>
    </section>
  )
}
