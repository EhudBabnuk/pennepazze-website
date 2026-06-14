"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useOrderModal } from "@/components/providers/order-modal-provider"

interface HeaderLocation {
  slug: string
  name: string
  id?: string
}

interface HeaderProps {
  locations?: HeaderLocation[]
}

const baseNavLinks = [
  { label: "Home", href: "/", ariaLabel: "Go to home page" },
  { label: "Menu", href: "/menu", ariaLabel: "View our menu", hasSubmenu: true },
  { label: "Reservations", href: "/", ariaLabel: "Make a reservation", isReservation: true },
  { label: "Careers", href: "/careers", ariaLabel: "View career opportunities" },
  { label: "Press", href: "/press", ariaLabel: "Read press coverage" },
  { label: "About", href: "/about", ariaLabel: "Learn about us" },
  { label: "Contact", href: "/contact", ariaLabel: "Contact us" },
]

export function Header({ locations = [] }: HeaderProps) {
  const { openModal } = useOrderModal()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showReservationConfirm, setShowReservationConfirm] = useState(false)

  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const normalizedLocations = locations.map((l) => ({
    id: l.slug ?? l.id ?? '',
    name: l.name,
  }))

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E8E8E8]">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 gap-8">
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md" aria-label="PennePazze home">
            <Image
              src="/images/penne-pazze-logo.png"
              alt="PennePazze Logo"
              width={120}
              height={80}
              priority
              className="h-16 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-8 flex-1" aria-label="Main navigation">
            {baseNavLinks.map((link) => (
              <div key={link.label} className="relative group">
                <button
                  onClick={() => {
                    if (link.isReservation) {
                      setShowReservationConfirm(true)
                    } else {
                      handleNavLinkClick()
                      window.location.href = link.href
                    }
                  }}
                  className="font-heading font-bold text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1 flex items-center gap-1"
                  aria-label={link.ariaLabel}
                  aria-expanded={link.hasSubmenu ? undefined : undefined}
                >
                  {link.label}
                  {link.hasSubmenu && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </button>

                {link.hasSubmenu && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    {normalizedLocations.map((location) => (
                      <Link
                        key={location.id}
                        href={`/locations/${location.id}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-[#FEF0B1] transition-colors"
                        onClick={handleNavLinkClick}
                      >
                        <div className="font-body text-foreground">{location.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Button
            asChild
            className="h-11 px-6 py-3 bg-transparent border-2 border-[#C1A561] text-[#C1A561] font-heading font-bold uppercase text-sm tracking-wide hover:bg-[#C1A561]/10 hover:border-[#D5B13A] transition-colors"
            aria-label="Browse catering services and private events"
          >
            <Link href="/catering">Catering & Private Events</Link>
          </Button>
          <PrimaryCTAButton
            onClick={openModal}
            className="h-11 px-6 py-3 text-sm"
            aria-label="Open order form"
          >
            Order Now
          </PrimaryCTAButton>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden w-full items-center justify-between px-4 py-3 bg-white">
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded" aria-label="PennePazze home">
            <Image
              src="/images/penne-pazze-logo.png"
              alt="PennePazze Logo"
              width={90}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </Link>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto text-foreground hover:bg-primary/10"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-white border-l border-border" aria-label="Main navigation">
              <nav className="flex flex-col gap-4 mt-8">
                {baseNavLinks.map((link) => (
                  <div key={link.label}>
                    {link.hasSubmenu ? (
                      <details className="group">
                        <summary className="nav-menu text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1 list-none cursor-pointer flex items-center gap-1">
                          {link.label}
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 pt-2 flex flex-col gap-2 border-l-2 border-[#D5B13A]">
                          {normalizedLocations.map((location) => (
                            <Link
                              key={location.id}
                              href={`/locations/${location.id}`}
                              onClick={() => { setMobileMenuOpen(false); handleNavLinkClick() }}
                              className="text-sm text-foreground hover:text-primary transition-colors"
                            >
                              {location.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => {
                          if (link.isReservation) setShowReservationConfirm(true)
                          setMobileMenuOpen(false)
                          handleNavLinkClick()
                        }}
                        aria-label={link.ariaLabel}
                        className="nav-menu text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1 block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                <Button
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 px-6 py-3 bg-[#D5B13A] text-black font-heading font-bold uppercase text-sm tracking-wide leading-normal hover:bg-[#C1A561] transition-colors"
                >
                  <Link href="/catering">Catering & Private Events</Link>
                </Button>
                <PrimaryCTAButton
                  onClick={() => { setMobileMenuOpen(false); openModal() }}
                  className="w-full h-11 px-6 py-3 text-sm"
                >
                  Order Now
                </PrimaryCTAButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {showReservationConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="bg-white border border-border p-8 rounded-lg max-w-sm w-full shadow-lg">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4 uppercase">Group Reservation</h2>
              <p className="text-foreground mb-4">
                Reservations are available for <span className="font-semibold">groups of 10 people or more</span>.
              </p>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Do you have a group of 10 or more people and would like to proceed with a reservation?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowReservationConfirm(false)}
                  className="flex-1 border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  asChild
                  onClick={() => setShowReservationConfirm(false)}
                  className="flex-1 h-10 px-6 py-2.5 bg-[#D5B13A] text-black font-heading font-bold uppercase text-sm tracking-wide leading-normal hover:bg-[#C1A561] transition-colors"
                >
                  <Link href="/">Continue</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[72px] md:h-[84px]" aria-hidden="true" />
    </>
  )
}
