import { getMenuPage, getMenuCategoriesWithItems } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import { MenuTabs } from "@/components/sections/menu-tabs"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import Image from "next/image"

export default async function MenuPage() {
  const [pageData, categories] = await Promise.all([
    getMenuPage(),
    getMenuCategoriesWithItems(),
  ])

  const heroImage = resolveImage(
    pageData?.heroImage as never,
    '/images/menu-hero.jpg',
    1200, 800,
  )
  const pdfUrl = pageData?.orderSection?.pdfUrl ?? pageData?.pdfUrl

  return (
    <>
      {/* HERO — Split Layout */}
      <section className="w-full border-b border-[#E8E8E8]">
        <div className="flex flex-col lg:flex-row min-h-[50vh] lg:min-h-[70vh]">
          <div className="w-full lg:w-1/2 bg-white flex items-center order-2 lg:order-1">
            <div className="w-full max-w-xl px-8 md:px-12 lg:px-16 xl:pl-24 py-16 lg:py-24 ml-auto">
              <h1 className="text-foreground mb-3">{pageData?.heroHeading ?? 'Our Menu'}</h1>
              <p className="subtitle-2 text-[#C1A561] mb-6">{pageData?.heroSubheading ?? 'Authentic Italian Cuisine'}</p>
              <p className="body-text text-foreground mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif" }}>
                {pageData?.heroBody ?? 'Browse our carefully curated selection of fresh, handcrafted dishes made with quality Italian ingredients and traditional recipes.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {pdfUrl ? (
                  <PrimaryCTAButton asChild className="px-8 py-3 flex items-center gap-2">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5" strokeWidth={2} />
                      Download PDF
                    </a>
                  </PrimaryCTAButton>
                ) : (
                  <PrimaryCTAButton className="px-8 py-3 flex items-center gap-2">
                    <Download className="w-5 h-5" strokeWidth={2} />
                    Download PDF
                  </PrimaryCTAButton>
                )}
                <Button
                  className="px-8 py-3 border-2 border-[#C1A561] bg-transparent text-[#C1A561] font-heading font-bold uppercase tracking-wider hover:bg-[#C1A561] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C1A561] rounded-full flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontSize: "0.875rem" }}
                >
                  <Share2 className="w-5 h-5" strokeWidth={2} />
                  Share
                </Button>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-0 order-1 lg:order-2">
            <Image
              src={heroImage}
              alt="Italian food spread with artisan pizza, fresh pasta, and traditional ingredients"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs + Dish Cards */}
      <section className="w-full py-12 md:py-20 bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <MenuTabs categories={categories} />
        </div>
      </section>
    </>
  )
}
