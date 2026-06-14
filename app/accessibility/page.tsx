export default function AccessibilityPage() {
  return (
    <>
      <section className="w-full border-b border-border overflow-x-hidden">
        <div className="relative w-full bg-gradient-to-br from-[#D5B13A] to-[#C1A561] min-h-[200px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full flex items-center justify-center z-10">
            <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12">
              <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 w-full rounded-lg shadow-lg text-center">
                <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Accessibility Statement</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="bg-white border border-border rounded-lg p-8">
            <div className="prose prose-sm max-w-none space-y-8">
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Commitment to Accessibility</h2>
                <p className="text-foreground leading-relaxed">PennePazze is committed to ensuring that our website is accessible to everyone, including people with disabilities.</p>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Accessibility Features</h2>
                <p className="text-foreground leading-relaxed">Our website includes alt text for images, keyboard navigation support, and screen reader compatibility.</p>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Standards Compliance</h2>
                <p className="text-foreground leading-relaxed">We strive to comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Contact</h2>
                <p className="text-foreground leading-relaxed">If you experience any accessibility issues, please <a href="/contact" className="text-[#D5B13A] underline">contact us</a> and we will work to assist you promptly.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8">Last updated: 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}
