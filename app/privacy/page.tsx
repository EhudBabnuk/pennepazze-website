export default function PrivacyPage() {
  return (
    <>
      <section className="w-full border-b border-border">
        <div className="relative w-full bg-gradient-to-br from-[#D5B13A] to-[#C1A561] min-h-[200px] md:min-h-[300px] flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 text-center">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-lg">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="bg-white border border-border rounded-lg p-8 space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Information We Collect</h2>
              <p className="text-foreground leading-relaxed">We collect information you provide when using our website, including contact form submissions and newsletter sign-ups.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">How We Use Your Information</h2>
              <p className="text-foreground leading-relaxed">We use the information we collect to respond to your inquiries, process orders, and send updates about PennePazze when you have opted in.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-3">Data Security</h2>
              <p className="text-foreground leading-relaxed">We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8">Last updated: 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}
