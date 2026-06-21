import { getPressPage, getPressArticles, getAwards } from "@/sanity/lib/queries"
import { resolveImage } from "@/sanity/lib/image"
import Image from "next/image"

export default async function PressPage() {
  const [pageData, articles, awards] = await Promise.all([
    getPressPage(),
    getPressArticles(),
    getAwards(),
  ])

  const mediaContact = pageData?.mediaContactSection ?? {}
  const mediaEmail = mediaContact.email ?? 'Shirnach@gmail.com'

  return (
    <>
      {/* Hero */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pasta21.05%201%20%5BVectorized%5D-CGiBKakNTjy4zp1JzSy0pivPokE7LA.png')`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }} />
        <div className="absolute inset-0 bg-[#E8D4A0]/30" />
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="mb-6" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {pageData?.heroHeading ?? 'In the Press'}
          </h1>
          <p className="max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7, color: "#333" }}>
            {pageData?.heroSubheading ?? 'What Nashville is saying about us.'}
          </p>
          {pageData?.googleRating && (
            <p className="mt-4" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#8B6914" }}>
              ⭐ {pageData.googleRating.rating} {pageData.googleRating.description}
            </p>
          )}
        </div>
      </section>

      {/* Awards */}
      {awards.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-[#FEF0B1] border-b border-border">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {awards.map((award: { _id: string; source: string; year?: number; ranking: string; description?: string }) => (
                <div key={award._id} className="bg-white border border-[#D5B13A]/30 rounded-lg px-6 py-5 flex flex-col items-center gap-2 min-w-[180px] max-w-[220px] text-center shadow-sm">
                  <p className="font-heading font-bold text-xs uppercase tracking-widest text-[#C1A561]">{award.source}</p>
                  {award.year && <p className="text-xs text-[#999]">{award.year}</p>}
                  <p className="font-heading font-bold text-sm text-foreground uppercase tracking-wide leading-snug">{award.ranking}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press Articles Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: {
              _id?: string; publication?: string; pullQuote?: string; logoText?: string;
              publicationLogo?: unknown; link?: string; linkText?: string
            }, index: number) => {
              const logoSrc = article.publicationLogo ? resolveImage(article.publicationLogo as never, '', 160, 60) : null
              return (
                <a
                  key={article._id ?? index}
                  href={article.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="p-8 flex items-center justify-center border-b border-[#E8E8E8] bg-[#FAFAFA] min-h-[100px]">
                    {logoSrc ? (
                      <Image src={logoSrc} alt={article.publication ?? ''} width={160} height={60} className="h-8 w-auto object-contain" />
                    ) : (
                      <span style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#666", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                        {article.logoText ?? article.publication ?? 'PRESS'}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {article.pullQuote && (
                      <blockquote className="flex-1 mb-4 italic" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.7, color: "#333" }}>
                        &ldquo;{article.pullQuote}&rdquo;
                      </blockquote>
                    )}
                    {article.linkText && (
                      <p className="text-[#D5B13A] group-hover:text-[#C1A561] transition-colors text-sm font-heading font-bold uppercase tracking-wide">
                        {article.linkText}
                      </p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="w-full py-16 md:py-24 bg-[#1a1a1a]">
        <div className="w-full max-w-2xl mx-auto px-4 md:px-8 text-center">
          <h2 className="mb-6" style={{ fontFamily: "var(--font-heading), 'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {mediaContact.heading ?? 'Press Inquiries'}
          </h2>
          <p className="mb-8" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontWeight: 500, fontSize: "1rem", lineHeight: 1.7, color: "#F7F2DE" }}>
            {mediaContact.body ?? 'For press inquiries, partnership opportunities, or media requests:'}
          </p>
          <a href={`mailto:${mediaEmail}`}
            className="inline-block bg-[#D5B13A] text-black px-8 py-3 font-heading font-bold uppercase text-sm tracking-wide rounded-full hover:bg-[#C1A561] transition-colors">
            {mediaEmail}
          </a>
        </div>
      </section>
    </>
  )
}
