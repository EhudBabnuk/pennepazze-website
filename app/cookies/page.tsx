export default function CookiesPage() {
  return (
    <>
      <section className="w-full border-b border-border">
        <div className="relative w-full bg-gradient-to-br from-[#D5B13A] to-[#C1A561] min-h-[200px] md:min-h-[300px] flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 text-center">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-lg">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Cookie Settings</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="bg-white border border-border rounded-lg p-8 space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">What Are Cookies</h2>
              <p className="text-foreground leading-relaxed">Cookies are small text files placed on your device to help our website function properly and improve your experience.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Essential Cookies</h2>
              <p className="text-foreground leading-relaxed">Some cookies are essential for the website to function correctly. These cannot be disabled.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Analytics Cookies</h2>
              <p className="text-foreground leading-relaxed">We use analytics cookies to understand how visitors interact with our website so we can improve it over time.</p>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8">Last updated: 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}
