"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteSettings {
  restaurantName?: string
  tagline?: string
  footerTagline?: string
  pressEmail?: string
  social?: {
    instagram?: string
    instagramHandle?: string
    facebook?: string
    tiktok?: string
    tiktokHandle?: string
  }
  newsletter?: {
    heading?: string
    body?: string
  }
  copyright?: string
}

interface FooterProps {
  siteSettings?: SiteSettings
}

export function Footer({ siteSettings }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const social = siteSettings?.social ?? {}
  const newsletter = siteSettings?.newsletter ?? {}
  const copyright = siteSettings?.copyright ?? `© ${new Date().getFullYear()} PennePazze. All rights reserved.`
  const tagline = siteSettings?.footerTagline ?? siteSettings?.tagline ?? 'Crazy good Italian cuisine. Made fresh. No compromises.'

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-black text-white border-t border-border">
      {/* Desktop Footer */}
      <div className="hidden md:block px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-8">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded mb-4">
                <Image
                  src="/images/penne-pazze-logo.png"
                  alt="PennePazze Logo"
                  width={120}
                  height={85}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-sm text-white mb-6 leading-relaxed">{tagline}</p>
              <div className="flex gap-4" role="navigation" aria-label="Social media links">
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    aria-label={`Follow us on Instagram ${social.instagramHandle ?? ''} (opens in new window)`}>
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    aria-label="Follow us on Facebook (opens in new window)">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {social.tiktok && (
                  <a href={social.tiktok} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    aria-label={`Follow us on TikTok ${social.tiktokHandle ?? ''} (opens in new window)`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Quick Links</h4>
              <nav className="flex flex-col gap-3" aria-label="Quick navigation links">
                {[
                  { href: '/menu', label: 'Menu' },
                  { href: '/catering', label: 'Catering' },
                  { href: '/about', label: 'About Us' },
                  { href: '/gelato-pazzo', label: 'Gelato Pazzo' },
                  { href: '/careers', label: 'Careers' },
                  { href: '/press', label: 'Press' },
                  { href: '/contact', label: 'Contact' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Legal</h4>
              <nav className="flex flex-col gap-3" aria-label="Legal and policy links">
                {[
                  { href: '/terms', label: 'Terms of Use' },
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/cookies', label: 'Cookie Settings' },
                  { href: '/accessibility', label: 'Accessibility' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Contact</h4>
              <nav className="flex flex-col gap-3" aria-label="Contact links">
                <Link href="/contact" className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1">
                  Contact Us
                </Link>
                <Link href="/locations" className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1">
                  Locations
                </Link>
                <Link href="/press" className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1">
                  Press & Media
                </Link>
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-accent/10 rounded-lg p-8 mb-8">
            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <h4 className="footer-menu text-accent">{newsletter.heading ?? 'Stay in the Loop'}</h4>
                </div>
                <p className="text-sm text-white/80 mb-4">{newsletter.body ?? 'New locations, seasonal specials, and behind-the-scenes stories — straight to your inbox.'}</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex-1">
                <div className="flex gap-2">
                  <input type="email" placeholder="Your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="flex-1 px-3 py-2 rounded bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <Button type="submit" className="bg-accent text-black hover:bg-accent/80 transition-colors px-4 py-2 text-sm font-heading font-bold uppercase">
                    Subscribe
                  </Button>
                </div>
                {subscribed && <p className="text-accent text-xs mt-2">Thank you for subscribing!</p>}
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white">
            <p>{copyright}</p>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden px-4 py-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded mb-4">
            <Image src="/images/penne-pazze-logo.png" alt="PennePazze Logo" width={120} height={85} className="h-20 w-auto mx-auto" />
          </Link>
          <p className="text-sm text-white mb-6">{tagline}</p>
        </div>

        <nav className="mb-6 pb-6 border-b border-white/10 flex flex-col gap-3" aria-label="Quick navigation links">
          {[
            { href: '/menu', label: 'Menu' }, { href: '/catering', label: 'Catering' },
            { href: '/about', label: 'About Us' }, { href: '/gelato-pazzo', label: 'Gelato Pazzo' },
            { href: '/careers', label: 'Careers' }, { href: '/press', label: 'Press' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-white hover:text-accent transition-colors">{label}</Link>
          ))}
        </nav>

        <nav className="mb-6 pb-6 border-b border-white/10 flex flex-col gap-3" aria-label="Legal and policy links">
          {[
            { href: '/terms', label: 'Terms of Use' }, { href: '/privacy', label: 'Privacy Policy' },
            { href: '/cookies', label: 'Cookie Settings' }, { href: '/accessibility', label: 'Accessibility' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-white hover:text-accent transition-colors">{label}</Link>
          ))}
        </nav>

        <div className="flex justify-center gap-4 mb-6" role="navigation" aria-label="Social media links">
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors"
              aria-label="Follow us on Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors"
              aria-label="Follow us on Facebook">
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {social.tiktok && (
            <a href={social.tiktok} target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors"
              aria-label="Follow us on TikTok">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
              </svg>
            </a>
          )}
        </div>

        <div className="bg-accent/10 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-accent" />
            <h4 className="footer-menu text-accent text-sm">Subscribe</h4>
          </div>
          <p className="text-xs text-white/80 mb-3">{newsletter.body ?? 'New locations, seasonal specials, and stories — straight to your inbox.'}</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input type="email" placeholder="Your email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-3 py-2 rounded bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/80 transition-colors px-3 py-2 text-xs font-heading font-bold uppercase">
              Subscribe
            </Button>
            {subscribed && <p className="text-accent text-xs text-center">Thank you!</p>}
          </form>
        </div>

        <p className="text-center text-xs text-white">{copyright}</p>
      </div>
    </footer>
  )
}
