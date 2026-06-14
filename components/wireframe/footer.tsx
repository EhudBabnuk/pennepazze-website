"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Instagram, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Newsletter subscribed:", email)
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
                  alt="Penne Pazze Logo"
                  width={120}
                  height={85}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-sm text-white mb-6 leading-relaxed">Crafted with passion and quality ingredients.</p>
              <div className="flex gap-4" role="navigation" aria-label="Social media links">
                <a 
                  href="https://instagram.com/pennepazzacharlotte" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Follow us on Instagram (opens in new window)"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Follow us on Facebook (opens in new window)"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Follow us on Twitter (opens in new window)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Visit Us</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-white">123 Main Street<br/>Charlotte, NC 28202</span>
                  </div>
                </div>
                <div>
                  <a 
                    href="tel:+17045551234"
                    className="flex items-center gap-3 text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                    aria-label="Call us at (704) 555-1234"
                  >
                    <Phone className="w-5 h-5 text-accent shrink-0" />
                    (704) 555-1234
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Quick Links</h4>
              <nav className="flex flex-col gap-3" aria-label="Quick navigation links">
                <Link 
                  href="/menu" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Menu
                </Link>
                <Link 
                  href="/catering" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Catering
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  About Us
                </Link>
                <Link 
                  href="/careers" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Careers
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="footer-menu text-accent mb-6">Legal</h4>
              <nav className="flex flex-col gap-3" aria-label="Legal and policy links">
                <Link 
                  href="/terms" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Terms of Use
                </Link>
                <Link 
                  href="/privacy" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/cookies" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Cookie Settings
                </Link>
                <Link 
                  href="/accessibility" 
                  className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
                >
                  Accessibility
                </Link>
              </nav>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-accent/10 rounded-lg p-8 mb-8">
            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <h4 className="footer-menu text-accent">Subscribe to Our Newsletter</h4>
                </div>
                <p className="text-sm text-white/80 mb-4">Get updates on new locations, seasonal specials, and behind-the-scenes stories.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex-1">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 rounded bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button
                    type="submit"
                    className="bg-accent text-black hover:bg-accent/80 transition-colors px-4 py-2 text-sm font-heading font-bold uppercase"
                  >
                    Subscribe
                  </Button>
                </div>
                {subscribed && (
                  <p className="text-accent text-xs mt-2">Thank you for subscribing!</p>
                )}
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white">
            <p>&copy; 2024 Penne Pazze. All rights reserved. Crazy good Italian cuisine.</p>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden px-4 py-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded mb-4">
            <Image
              src="/images/penne-pazze-logo.png"
              alt="Penne Pazze Logo"
              width={120}
              height={85}
              className="h-20 w-auto mx-auto"
            />
          </Link>
          <p className="text-sm text-white mb-6">Crazy good Italian cuisine.</p>
        </div>

        {/* Location */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <span className="text-sm text-white">123 Main Street<br/>Charlotte, NC 28202</span>
          </div>
          <a
            href="tel:+17045551234"
            className="flex items-center gap-3 text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1 inline-flex"
            aria-label="Call us at (704) 555-1234"
          >
            <Phone className="w-4 h-4 shrink-0" />
            (704) 555-1234
          </a>
        </div>

        {/* Quick Links */}
        <nav className="mb-6 pb-6 border-b border-white/10 flex flex-col gap-3" aria-label="Quick navigation links">
          <Link 
            href="/menu" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Menu
          </Link>
          <Link 
            href="/catering" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Catering
          </Link>
          <Link 
            href="/about" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            About Us
          </Link>
          <Link 
            href="/careers" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Careers
          </Link>
        </nav>

        {/* Legal Links */}
        <nav className="mb-6 pb-6 border-b border-white/10 flex flex-col gap-3" aria-label="Legal and policy links">
          <Link 
            href="/terms" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Terms of Use
          </Link>
          <Link 
            href="/privacy" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/cookies" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Cookie Settings
          </Link>
          <Link 
            href="/accessibility" 
            className="text-sm text-white hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded px-2 py-1"
          >
            Accessibility
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-6" role="navigation" aria-label="Social media links">
          <a 
            href="https://instagram.com/pennepazzacharlotte" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            aria-label="Follow us on Instagram (opens in new window)"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            aria-label="Follow us on Facebook (opens in new window)"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            aria-label="Follow us on Twitter (opens in new window)"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Newsletter Section */}
        <div className="bg-accent/10 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-accent" />
            <h4 className="footer-menu text-accent text-sm">Subscribe</h4>
          </div>
          <p className="text-xs text-white/80 mb-3">Get updates on new locations and specials.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button
              type="submit"
              className="w-full bg-accent text-black hover:bg-accent/80 transition-colors px-3 py-2 text-xs font-heading font-bold uppercase"
            >
              Subscribe
            </Button>
            {subscribed && (
              <p className="text-accent text-xs text-center">Thank you!</p>
            )}
          </form>
        </div>

        <p className="text-center text-xs text-white">
          &copy; 2024 Penne Pazze. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
