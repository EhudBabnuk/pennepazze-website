"use client"

import { useState } from "react"
import Image from "next/image"
import { resolveImage } from "@/sanity/lib/image"
import { useOrderModal } from "@/components/providers/order-modal-provider"

interface MenuItem {
  _id?: string
  name: string
  description?: string
  price: string
  popular?: boolean
  image?: unknown
}

interface MenuCategory {
  _id?: string
  id: string
  name: string
  image?: unknown
  imageFallback?: string
  items: MenuItem[]
}

interface MenuTabsProps {
  categories: MenuCategory[]
}

export function MenuTabs({ categories }: MenuTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '')
  const { openModal } = useOrderModal()

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0]
  const categoryImageSrc = activeCat
    ? resolveImage(activeCat.image as never, activeCat.imageFallback ?? '/placeholder.jpg', 800, 500)
    : '/placeholder.jpg'

  return (
    <>
      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Menu categories"
        className="flex items-center justify-center gap-2 md:gap-3 mb-12 md:mb-16 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            id={`tab-${cat.id}`}
            aria-selected={activeCategory === cat.id}
            aria-controls={`panel-${cat.id}`}
            tabIndex={activeCategory === cat.id ? 0 : -1}
            onClick={() => setActiveCategory(cat.id)}
            onKeyDown={(e) => {
              const tabs = categories.map((c) => c.id)
              const idx = tabs.indexOf(activeCategory)
              if (e.key === "ArrowRight") { e.preventDefault(); setActiveCategory(tabs[(idx + 1) % tabs.length]) }
              else if (e.key === "ArrowLeft") { e.preventDefault(); setActiveCategory(tabs[(idx - 1 + tabs.length) % tabs.length]) }
            }}
            className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-200 font-heading font-bold uppercase tracking-wider whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B13A] focus-visible:ring-offset-2 ${
              activeCategory === cat.id
                ? "bg-[#D5B13A] text-black shadow-sm"
                : "bg-white text-[#272727] border border-[#E8E8E8] hover:border-[#C1A561] hover:text-[#C1A561]"
            }`}
            style={{ fontSize: "0.875rem" }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Dish Cards Grid */}
      {activeCat && (
        <div role="tabpanel" id={`panel-${activeCategory}`} aria-labelledby={`tab-${activeCategory}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCat.items.map((item, index) => (
              <div
                key={item._id ?? `${activeCategory}-${index}`}
                className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="relative w-full aspect-[16/10] bg-[#F4F4F4]">
                  <Image
                    src={item.image ? resolveImage(item.image as never, categoryImageSrc, 400, 250) : categoryImageSrc}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-[#D5B13A] text-black px-3 py-1 rounded-full font-heading font-bold uppercase" style={{ fontSize: "0.625rem", letterSpacing: "0.1em" }}>
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-[#272727] flex-1">{item.name}</h4>
                    <span className="text-[#D5B13A] whitespace-nowrap shrink-0" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.05em" }}>
                      {item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[#999999] mb-4 flex-1" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "0.8125rem", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  )}
                  <button
                    onClick={openModal}
                    className="w-full py-2.5 rounded border border-[#D5B13A] text-[#D5B13A] font-heading font-bold uppercase transition-colors duration-200 hover:bg-[#D5B13A] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B13A] focus-visible:ring-offset-2"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                    aria-label={`Order ${item.name}`}
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
