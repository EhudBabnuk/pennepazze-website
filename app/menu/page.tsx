"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/wireframe/header"
import { Footer } from "@/components/wireframe/footer"
import { OrderModal } from "@/components/wireframe/order-modal"
import { StickyOrderButton } from "@/components/wireframe/sticky-order-button"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

/* ============================================
   MENU DATA — realistic Italian items
   ============================================ */
const menuCategories = [
  {
    id: "pizza",
    name: "Pizza",
    image: "/images/menu/pizza-margherita.jpg",
    items: [
      { name: "Margherita", description: "San Marzano tomatoes, fresh mozzarella, basil, extra-virgin olive oil.", price: "$14.00", popular: true },
      { name: "Diavola", description: "Spicy salami, crushed Calabrian chili, mozzarella, tomato sauce.", price: "$16.00" },
      { name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, fontina, parmigiano-reggiano.", price: "$17.00" },
      { name: "Prosciutto e Rucola", description: "Prosciutto di Parma, wild arugula, shaved parmesan, truffle oil.", price: "$18.00", popular: true },
      { name: "Veggie Supreme", description: "Roasted peppers, artichokes, olives, mushrooms, red onion, mozzarella.", price: "$15.00" },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    image: "/images/menu/pasta-bolognese.jpg",
    items: [
      { name: "Penne Arrabbiata", description: "Penne in a spicy tomato sauce with garlic and fresh parsley.", price: "$13.00", popular: true },
      { name: "Spaghetti Bolognese", description: "Slow-simmered beef and pork ragu over hand-rolled spaghetti.", price: "$15.00" },
      { name: "Fettuccine Alfredo", description: "Silky parmesan cream sauce tossed with fresh fettuccine.", price: "$14.00" },
      { name: "Cacio e Pepe", description: "Pecorino Romano and cracked black pepper on tonnarelli.", price: "$16.00", popular: true },
      { name: "Lasagna Classica", description: "Layers of pasta, beef ragu, bechamel, and mozzarella.", price: "$17.00" },
      { name: "Gnocchi al Pesto", description: "Potato gnocchi in fresh basil pesto with pine nuts and parmesan.", price: "$15.00" },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    image: "/images/menu/caesar-salad.jpg",
    items: [
      { name: "Caesar Salad", description: "Crisp romaine, house-made croutons, parmesan, creamy Caesar dressing.", price: "$11.00", popular: true },
      { name: "Caprese", description: "Fresh burrata, heirloom tomatoes, basil, aged balsamic reduction.", price: "$13.00" },
      { name: "Insalata Mista", description: "Mixed greens, cherry tomatoes, cucumbers, red onion, lemon vinaigrette.", price: "$10.00" },
      { name: "Arugula e Parmigiano", description: "Wild arugula, shaved parmesan, lemon, extra-virgin olive oil.", price: "$11.00" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    image: "/images/menu/italian-drinks.jpg",
    items: [
      { name: "Aperol Spritz", description: "Aperol, prosecco, soda water, fresh orange slice.", price: "$12.00", popular: true },
      { name: "Negroni", description: "Gin, Campari, sweet vermouth, orange peel.", price: "$13.00" },
      { name: "Limonata Fresca", description: "Fresh-squeezed lemonade with mint and sparkling water.", price: "$6.00" },
      { name: "Espresso", description: "Double-shot Italian espresso from premium roasted beans.", price: "$4.00" },
      { name: "House Red Wine", description: "Chianti Classico, smooth and medium-bodied Tuscan red.", price: "$11.00" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    image: "/images/menu/tiramisu.jpg",
    items: [
      { name: "Tiramisu", description: "Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.", price: "$9.00", popular: true },
      { name: "Panna Cotta", description: "Vanilla bean panna cotta with seasonal berry compote.", price: "$8.00" },
      { name: "Cannoli Siciliani", description: "Crispy shells filled with sweet ricotta, chocolate chips, pistachios.", price: "$7.00", popular: true },
      { name: "Gelato", description: "House-made gelato: pistachio, stracciatella, or limone. Two scoops.", price: "$7.00" },
    ],
  },
]

export default function MenuPage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("pizza")

  const activeCategoryData = menuCategories.find((c) => c.id === activeCategory)!

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => setOrderModalOpen(true)} />

      <main className="flex-1 flex flex-col pb-24 md:pb-0">
        {/* =============================================
            HERO — Split Layout (Text Left, Image Right)
            ============================================= */}
        <section className="w-full border-b border-[#E8E8E8]">
          <div className="flex flex-col lg:flex-row min-h-[50vh] lg:min-h-[70vh]">
            {/* Left Column: Text — vertically centered */}
            <div className="w-full lg:w-1/2 bg-white flex items-center order-2 lg:order-1">
              <div className="w-full max-w-xl px-8 md:px-12 lg:px-16 xl:pl-24 py-16 lg:py-24 ml-auto">
                <h1 className="text-foreground mb-3">Our Menu</h1>
                <p className="subtitle-2 text-[#C1A561] mb-6">
                  Authentic Italian Cuisine
                </p>
                <p
                  className="body-text text-foreground mb-8"
                  style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}
                >
                  Browse our carefully curated selection of fresh, handcrafted dishes
                  made with quality Italian ingredients and traditional recipes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Main Button - Download PDF */}
                  <PrimaryCTAButton className="px-8 py-3 flex items-center gap-2">
                    <Download className="w-5 h-5" strokeWidth={2} />
                    Download PDF
                  </PrimaryCTAButton>
                  {/* Secondary Button - Share */}
                  <Button
                    className="px-8 py-3 border-2 border-[#C1A561] bg-transparent text-[#C1A561] font-heading font-bold uppercase tracking-wider hover:bg-[#C1A561] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C1A561] rounded flex items-center gap-2"
                    style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontSize: "0.875rem" }}
                  >
                    <Share2 className="w-5 h-5" strokeWidth={2} />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Full-bleed image — flush to right edge */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-0 order-1 lg:order-2">
              <Image
                src="/images/menu-hero.jpg"
                alt="Italian food spread with artisan pizza, fresh pasta, and traditional ingredients"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* =============================================
            SECTION 2 — Category Tabs + Dish Cards
            ============================================= */}
        <section className="w-full py-12 md:py-20 bg-[#FAFAFA]">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8">

            {/* Category Tabs */}
            <div
              role="tablist"
              aria-label="Menu categories"
              className="flex items-center justify-center gap-2 md:gap-3 mb-12 md:mb-16 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={activeCategory === cat.id}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={activeCategory === cat.id ? 0 : -1}
                  onClick={() => setActiveCategory(cat.id)}
                  onKeyDown={(e) => {
                    const tabs = menuCategories.map((c) => c.id)
                    const idx = tabs.indexOf(activeCategory)
                    if (e.key === "ArrowRight") {
                      e.preventDefault()
                      setActiveCategory(tabs[(idx + 1) % tabs.length])
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault()
                      setActiveCategory(tabs[(idx - 1 + tabs.length) % tabs.length])
                    }
                  }}
                  className={`
                    flex-shrink-0 px-6 py-3 rounded-full transition-all duration-200
                    font-heading font-bold uppercase tracking-wider whitespace-nowrap
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B13A] focus-visible:ring-offset-2
                    ${activeCategory === cat.id
                      ? "bg-[#D5B13A] text-black shadow-sm"
                      : "bg-white text-[#272727] border border-[#E8E8E8] hover:border-[#C1A561] hover:text-[#C1A561]"
                    }
                  `}
                  style={{ fontSize: "0.875rem" }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dish Cards Grid */}
            <div
              role="tabpanel"
              id={`panel-${activeCategory}`}
              aria-labelledby={`tab-${activeCategory}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategoryData.items.map((item, index) => (
                  <div
                    key={`${activeCategory}-${index}`}
                    className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                  >
                    {/* Dish Image */}
                    <div className="relative w-full aspect-[16/10] bg-[#F4F4F4]">
                      <Image
                        src={activeCategoryData.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Popular badge */}
                      {item.popular && (
                        <span
                          className="absolute top-3 left-3 bg-[#D5B13A] text-black px-3 py-1 rounded-full font-heading font-bold uppercase"
                          style={{ fontSize: "0.625rem", letterSpacing: "0.1em" }}
                        >
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      {/* Dish name + price row */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-[#272727] flex-1">{item.name}</h4>
                        <span
                          className="text-[#D5B13A] whitespace-nowrap shrink-0"
                          style={{
                            fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-[#999999] mb-4 flex-1"
                        style={{
                          fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: "0.8125rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Order button */}
                      <button
                        onClick={() => setOrderModalOpen(true)}
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
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky Order Button */}
      <StickyOrderButton onClick={() => setOrderModalOpen(true)} />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  )
}
