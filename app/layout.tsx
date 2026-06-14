import React from "react"
import type { Metadata } from 'next'
import { Oswald, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Header } from '@/components/wireframe/header'
import { Footer } from '@/components/wireframe/footer'
import { StickyOrderButton } from '@/components/wireframe/sticky-order-button'
import { OrderModal } from '@/components/wireframe/order-modal'
import { OrderModalProvider } from '@/components/providers/order-modal-provider'
import { getSiteSettings, getLocations } from '@/sanity/lib/queries'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seo ?? {}
  return {
    title: seo.title ?? 'PennePazze — Crazy Good Italian Cuisine',
    description: seo.description ?? 'PennePazze serves authentic Italian cuisine made fresh daily. Handmade pasta, no seed oils, Nashville &amp; Murfreesboro.',
    keywords: seo.keywords ? seo.keywords.split(',').map((k: string) => k.trim()) : ['italian restaurant', 'penne pazze', 'italian cuisine', 'pasta'],
    generator: 'v0.app',
    creator: settings?.restaurantName ?? 'PennePazze',
    openGraph: {
      type: 'website',
      title: seo.title ?? 'PennePazze — Crazy Good Italian Cuisine',
      description: seo.description ?? 'PennePazze — authentic Italian made fresh daily.',
    },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locations, siteSettings] = await Promise.all([
    getLocations(),
    getSiteSettings(),
  ])

  return (
    <html lang="en" className={`scroll-smooth ${oswald.variable} ${openSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#D5B13A" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#272727" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ScrollToTop />
        <OrderModalProvider>
          <div className="min-h-screen flex flex-col">
            <Header locations={locations} />
            <main className="flex-1 flex flex-col pb-24 md:pb-0">
              {children}
            </main>
            <Footer siteSettings={siteSettings} />
          </div>
          <StickyOrderButton />
          <OrderModal locations={locations} />
        </OrderModalProvider>
        <Analytics />
      </body>
    </html>
  )
}
