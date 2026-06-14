export default function TermsPage() {
  return (
    <>
      <section className="w-full border-b border-border">
        <div className="relative w-full bg-gradient-to-br from-[#D5B13A] to-[#C1A561] min-h-[200px] md:min-h-[300px] flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 text-center">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-lg">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Terms of Use</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="bg-white border border-border rounded-lg p-8 space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Acceptance of Terms</h2>
              <p className="text-foreground leading-relaxed">By accessing the PennePazze website, you agree to be bound by these terms of use and all applicable laws and regulations.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Use of Website</h2>
              <p className="text-foreground leading-relaxed">This website is provided for informational purposes about PennePazze restaurants. You may not use this site for any unlawful purpose.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Intellectual Property</h2>
              <p className="text-foreground leading-relaxed">All content on this website, including text, images, and logos, is the property of PennePazze and protected by applicable copyright laws.</p>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8">Last updated: 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}
