import React from "react"
import type { Metadata } from 'next'
import { Oswald, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTop } from '@/components/scroll-to-top'
import './globals.css'

// Load Oswald font with all needed weights
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

// Load Open Sans font with all needed weights
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Penne Pazze - Crazy Good Italian Cuisine',
  description: 'Penne Pazze serves crazy good Italian cuisine with authentic recipes and quality ingredients. Order online, explore our menu, and discover our passion for Italian food.',
  keywords: ['italian restaurant', 'penne pazze', 'italian cuisine', 'pasta', 'pizza', 'order online'],
  generator: 'v0.app',
  creator: 'Penne Pazze',
  openGraph: {
    type: 'website',
    title: 'Penne Pazze - Crazy Good Italian Cuisine',
    description: 'Penne Pazze serves crazy good Italian cuisine with authentic recipes and quality ingredients.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
