import { client } from './client'

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return Boolean(id && id !== 'not-configured' && id.length > 0)
}

const REVALIDATE_SHORT = { next: { revalidate: 120 } }
const REVALIDATE_LONG  = { next: { revalidate: 300 } }

// ─────────────────────────────────────────────
// Types (used by callers)
// ─────────────────────────────────────────────

export interface SanityLocation {
  _id: string
  slug: string          // normalised from slug.current
  name: string
  status: 'open' | 'opening-soon' | 'coming-soon'
  neighborhood?: string
  city?: string
  state?: string
  address?: string
  phone?: string
  hours?: { weekdays?: string; weekend?: string; notes?: string }
  tagline?: string
  description?: string
  features?: string[]
  orderLink?: string
  googleMapsUrl?: string
  image?: unknown
  featured?: boolean
  hasEmailSignup?: boolean
  openingNote?: string
  displayOrder?: number
}

// ─────────────────────────────────────────────
// Fallback data (real content from the document)
// ─────────────────────────────────────────────

const FALLBACK_SITE_SETTINGS = {
  restaurantName: 'PennePazze',
  tagline: 'Crazy Good Italian. Made Fresh. No Compromises.',
  footerTagline: 'Crazy good Italian cuisine. Made fresh. No compromises.',
  footerAbout: 'Real ingredients. Real recipes. Brought straight from Italy — and growing across Middle Tennessee.',
  copyright: '© 2025 PennePazze. All rights reserved. Crazy Good Italian Cuisine.',
  social: {
    instagramHandle: '@pennepazzeofficial',
    tiktokHandle: '@pennepazze',
  },
  pressEmail: 'Shirnach@gmail.com',
  newsletter: {
    heading: 'Stay in the Loop',
    body: 'New locations, seasonal specials, and behind-the-scenes stories — straight to your inbox. No spam, just pasta.',
  },
  seo: {
    title: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro',
    description: 'Authentic Italian made fresh daily. Handmade pasta, house-crafted sauces, never any seed oils. Fast casual dining in Nashville and Murfreesboro.',
  },
}

const FALLBACK_LOCATIONS: SanityLocation[] = [
  {
    _id: 'location-nashville-ll',
    slug: 'nashville-ll',
    name: 'Nashville — L&L Market',
    status: 'open',
    neighborhood: 'L&L Market · Charlotte Ave',
    city: 'Nashville',
    state: 'TN',
    address: '3826 Charlotte Ave, Nashville, TN 37209',
    phone: '(615) 285-3357',
    hours: { weekdays: 'Tue–Sun 11am – 9:30pm', notes: 'Happy Hour Mon–Fri 2–5 PM' },
    tagline: 'Where it all started.',
    description: 'Our original home. Tucked inside the vibrant L&L Market in Sylvan Park, this is where PennePazze was born.',
    features: ['Dine-in', 'Pickup', 'Delivery', 'Happy Hour', 'Outdoor Patio', 'Dog Friendly'],
    featured: true,
    hasEmailSignup: false,
    displayOrder: 1,
  },
  {
    _id: 'location-nashville-germantown',
    slug: 'nashville-germantown',
    name: 'Nashville — Germantown',
    status: 'opening-soon',
    neighborhood: 'Germantown',
    city: 'Nashville',
    state: 'TN',
    address: '820 4th Avenue North, Nashville, TN 37219',
    tagline: 'Opening Soon.',
    description: "One of Nashville's most vibrant neighborhoods is about to get a little more Italian.",
    features: ['Dine-in', 'Pickup', 'Delivery'],
    featured: true,
    hasEmailSignup: true,
    openingNote: 'Opening very soon. Sign up to be the first to know.',
    displayOrder: 2,
  },
  {
    _id: 'location-murfreesboro',
    slug: 'murfreesboro',
    name: 'Murfreesboro',
    status: 'open',
    city: 'Murfreesboro',
    state: 'TN',
    address: '1430 Medical Center Parkway, Murfreesboro TN 37129',
    phone: '(615) 266-0641',
    hours: { weekdays: 'Tue–Sun 11am – 9:30pm', notes: 'Happy Hour Mon–Fri 2–5 PM' },
    tagline: 'Same crazy-good Italian. Closer to home.',
    description: 'We heard you — and we brought PennePazze to Murfreesboro.',
    features: ['Dine-in', 'Pickup', 'Delivery', 'Happy Hour'],
    featured: true,
    hasEmailSignup: false,
    displayOrder: 3,
  },
  {
    _id: 'location-franklin',
    slug: 'franklin',
    name: 'Franklin',
    status: 'coming-soon',
    city: 'Franklin',
    state: 'TN',
    tagline: 'Coming Soon.',
    description: 'We are growing — and Franklin is next.',
    features: ['Dine-in', 'Pickup', 'Delivery'],
    featured: true,
    hasEmailSignup: true,
    openingNote: 'Expected end of 2026 / early 2027.',
    displayOrder: 4,
  },
]

// ─────────────────────────────────────────────
// Site Settings
// ─────────────────────────────────────────────

export async function getSiteSettings() {
  if (!isSanityConfigured()) return FALLBACK_SITE_SETTINGS
  return client.fetch(`*[_type == "siteSettings"][0]`, {}, REVALIDATE_LONG)
}

// ─────────────────────────────────────────────
// Locations
// ─────────────────────────────────────────────

const LOCATION_PROJECTION = `{
  _id,
  "slug": slug.current,
  name, status, neighborhood, city, state,
  address, phone, hours, tagline, description,
  features, orderLink, googleMapsUrl,
  image, featured, hasEmailSignup, openingNote, displayOrder
}`

export async function getLocations(): Promise<SanityLocation[]> {
  if (!isSanityConfigured()) return FALLBACK_LOCATIONS
  return client.fetch(
    `*[_type == "location"] | order(displayOrder asc) ${LOCATION_PROJECTION}`,
    {}, REVALIDATE_SHORT,
  )
}

export async function getLocationBySlug(slug: string): Promise<SanityLocation | null> {
  if (!isSanityConfigured()) {
    return FALLBACK_LOCATIONS.find((l) => l.slug === slug) ?? null
  }
  return client.fetch(
    `*[_type == "location" && slug.current == $slug][0] ${LOCATION_PROJECTION}`,
    { slug }, REVALIDATE_SHORT,
  )
}

// ─────────────────────────────────────────────
// Menu
// ─────────────────────────────────────────────

const FALLBACK_MENU_CATEGORIES = [
  {
    _id: 'cat-signature-pasta', id: 'signature-pasta', slug: 'signature-pasta', name: 'Signature Pasta',
    description: null, highlightedItems: [], image: null, displayOrder: 1,
    items: [
      { _id: 'item-amatriciana', name: 'Amatriciana', description: null, price: '$18.00', popular: false, image: null },
      { _id: 'item-campanelle-pazze', name: 'Campanelle Pazze', description: null, price: '$18.00', popular: false, image: null },
      { _id: 'item-carbonara-pazza', name: 'Carbonara Pazza', description: null, price: '$19.00', popular: false, image: null },
      { _id: 'item-crema-di-broccoli', name: 'Crema di Broccoli', description: null, price: '$18.00', popular: false, image: null },
      { _id: 'item-gnocchi-gorgonzola', name: 'Gnocchi Crema di Gorgonzola', description: null, price: '$18.00', popular: false, image: null },
      { _id: 'item-lasagna', name: 'Lasagna', description: null, price: '$18.00', popular: false, image: null },
      { _id: 'item-nonna-paula', name: 'Nonna Paula', description: null, price: '$19.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-signature-pinsa', id: 'signature-pinsa', slug: 'signature-pinsa', name: 'Signature Pinsa',
    description: null, highlightedItems: [], image: null, displayOrder: 2,
    items: [
      { _id: 'item-piccantina', name: 'Piccantina', description: null, price: '$20.00', popular: false, image: null },
      { _id: 'item-pinsa-funghi', name: 'Pinsa Funghi', description: null, price: '$20.00', popular: false, image: null },
      { _id: 'item-pinsa-maiala', name: 'Pinsa Maiala', description: null, price: '$19.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-fresh-salads', id: 'fresh-salads', slug: 'fresh-salads', name: 'Fresh Salads',
    description: null, highlightedItems: [], image: null, displayOrder: 3,
    items: [
      { _id: 'item-arugula-salad', name: 'Arugula Salad', description: null, price: '$10.00', popular: false, image: null },
      { _id: 'item-beet-spinach-salad', name: 'Beet Spinach Salad', description: null, price: '$10.00', popular: false, image: null },
      { _id: 'item-crudo-e-burrata', name: 'Crudo E Burrata', description: null, price: '$15.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-panini', id: 'panini', slug: 'panini', name: 'Panini',
    description: null, highlightedItems: [], image: null, displayOrder: 4,
    items: [
      { _id: 'item-meatball-panini', name: 'Meatball Panini', description: null, price: '$17.00', popular: false, image: null },
      { _id: 'item-panini-caprese', name: 'Panini Caprese', description: null, price: '$15.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-kids-meal', id: 'kids-meal', slug: 'kids-meal', name: 'Kids Meal',
    description: null, highlightedItems: [], image: null, displayOrder: 5,
    items: [
      { _id: 'item-pasta-butter-cheese', name: 'Pasta With Butter & Cheese', description: null, price: '$10.00', popular: false, image: null },
      { _id: 'item-pasta-tomato-cheese', name: 'Pasta With Tomato Sauce & Cheese', description: null, price: '$10.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-beverages', id: 'beverages', slug: 'beverages', name: 'Beverages',
    description: null, highlightedItems: [], image: null, displayOrder: 6,
    items: [
      { _id: 'item-beer', name: 'Beer', description: null, price: '$7.00', popular: false, image: null },
      { _id: 'item-bottle-of-wine', name: 'Bottle of Wine', description: null, price: '$30.00', popular: false, image: null },
      { _id: 'item-cappuccino', name: 'Cappuccino', description: null, price: '$5.00', popular: false, image: null },
      { _id: 'item-coke-cola-de-mexico', name: 'Coke Cola de Mexico', description: null, price: '$3.50', popular: false, image: null },
      { _id: 'item-espresso', name: 'Espresso', description: null, price: '$3.00', popular: false, image: null },
      { _id: 'item-glass-of-wine', name: 'Glass of Wine', description: null, price: '$10.00', popular: false, image: null },
      { _id: 'item-italian-beer', name: 'Italian Beer', description: null, price: '$8.00', popular: false, image: null },
      { _id: 'item-italian-sparkling-water', name: 'Italian Sparkling Mineral Water', description: null, price: '$4.00', popular: false, image: null },
      { _id: 'item-lemonade', name: 'Lemonade', description: null, price: '$3.50', popular: false, image: null },
      { _id: 'item-mineral-water', name: 'Mineral Water', description: null, price: '$3.00', popular: false, image: null },
      { _id: 'item-pennepazzee-cocktail', name: 'PennePazzee Cocktail', description: null, price: '$10.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-desserts', id: 'desserts', slug: 'desserts', name: 'Desserts',
    description: null, highlightedItems: [], image: null, displayOrder: 7,
    items: [
      { _id: 'item-cannoli-cones', name: 'Cannoli Cones', description: null, price: '$6.00', popular: false, image: null },
    ],
  },
  {
    _id: 'cat-italian-kitchen', id: 'from-the-italian-kitchen', slug: 'from-the-italian-kitchen', name: 'From the Italian Kitchen',
    description: null, highlightedItems: [], image: null, displayOrder: 8,
    items: [
      { _id: 'item-pane-puffs', name: 'Pane Puffs', description: null, price: '$10.00', popular: false, image: null },
    ],
  },
]

export async function getMenuCategoriesWithItems() {
  if (!isSanityConfigured()) return FALLBACK_MENU_CATEGORIES
  return client.fetch(
    `*[_type == "menuCategory"] | order(displayOrder asc) {
      _id, "id": slug.current, "slug": slug.current, name, description, highlightedItems, image, displayOrder,
      "items": *[_type == "menuItem" && references(^._id) && isHidden != true] | order(displayOrder asc) {
        _id, name, description, price, popular, image, allergens,
        "locations": locations[]->{ _id, "slug": slug.current, name }
      }
    }`,
    {}, REVALIDATE_SHORT,
  )
}

// ─────────────────────────────────────────────
// Awards
// ─────────────────────────────────────────────

const FALLBACK_AWARDS = [
  { _id: 'a1', source: 'Nashville Scene', year: 2025, ranking: '#2 Best Italian in Nashville, 2025', description: 'For the second year in a row, Nashville Scene readers named PennePazze one of the best Italian restaurants in the city.', featured: true, displayOrder: 1 },
  { _id: 'a2', source: 'Nashville Scene', year: 2024, ranking: '#3 Best Italian in Nashville, 2024', description: 'Our first year in the rankings — and we came in third.', featured: true, displayOrder: 2 },
  { _id: 'a3', source: 'Google Reviews', year: 2025, ranking: '4.8 stars on Google', description: 'Across thousands of reviews from Nashville and Murfreesboro guests.', featured: true, displayOrder: 3 },
]

export async function getAwards() {
  if (!isSanityConfigured()) return FALLBACK_AWARDS
  return client.fetch(
    `*[_type == "award"] | order(displayOrder asc) { _id, source, year, ranking, description, badge, featured, displayOrder }`,
    {}, REVALIDATE_LONG,
  )
}

// ─────────────────────────────────────────────
// Press Articles
// ─────────────────────────────────────────────

const FALLBACK_PRESS = [
  { _id: 'p1', publication: 'The Infatuation', pullQuote: 'Tucked into L&L Market in Sylvan Heights, making extremely on-point handmade pastas.', linkText: 'Read the Review →', logoText: 'THE INFATUATION', featured: true, displayOrder: 1 },
  { _id: 'p2', publication: 'Nashville Go', pullQuote: 'PennePazze is an authentic, laid-back Italian eatery — a local favorite in Sylvan Park.', linkText: 'Read the Article →', logoText: 'NASHVILLE GO', featured: true, displayOrder: 2 },
  { _id: 'p3', publication: 'Yelp Nashville', pullQuote: "Consistently among Nashville's highest-rated Italian restaurants.", logoText: 'YELP', featured: false, displayOrder: 3 },
]

export async function getPressArticles() {
  if (!isSanityConfigured()) return FALLBACK_PRESS
  return client.fetch(
    `*[_type == "pressArticle"] | order(displayOrder asc) {
      _id, publication, pullQuote, link, linkText, publicationLogo, logoText, featured, displayOrder
    }`,
    {}, REVALIDATE_SHORT,
  )
}

// ─────────────────────────────────────────────
// News Carousel Slides
// ─────────────────────────────────────────────

const FALLBACK_SLIDES = [
  { _id: 's1', label: 'COMING SOON', title: 'Germantown Opening Soon', description: "PennePazze is coming to Nashville's Germantown neighborhood. Stay tuned.", buttonText: 'Learn More →', buttonLink: '/locations/nashville-germantown', image: null, displayOrder: 1 },
  { _id: 's2', label: 'NEW', title: 'Gelato Pazzo is Open', description: 'Fresh Italian gelato, made in-house from real ingredients. A new obsession from the PennePazze family.', buttonText: 'Discover Gelato Pazzo →', buttonLink: '/gelato-pazzo', image: null, displayOrder: 2 },
  { _id: 's3', label: 'AWARD', title: '#2 Best Italian in Nashville 2025', description: 'Named #2 Best Italian Restaurant in Nashville by Nashville Scene — for the second year in a row.', buttonText: 'Read More →', buttonLink: '/press', image: null, displayOrder: 3 },
]

export async function getUpdatesSlides() {
  if (!isSanityConfigured()) return FALLBACK_SLIDES
  return client.fetch(
    `*[_type == "updatesSlide"] | order(displayOrder asc) {
      _id, label, title, description, buttonText, buttonLink, image, displayOrder
    }`,
    {}, REVALIDATE_SHORT,
  )
}

// ─────────────────────────────────────────────
// Catering Benefits (legacy collection)
// ─────────────────────────────────────────────

const FALLBACK_BENEFITS = [
  { _id: 'b1', icon: 'Briefcase', title: 'Corporate Catering', description: 'Boxed lunches to full buffet spreads — fresh Italian that actually impresses.', displayOrder: 1 },
  { _id: 'b2', icon: 'Heart', title: 'Weddings and Private Events', description: 'We will work with you on a custom menu that fits your event and vision.', displayOrder: 2 },
  { _id: 'b3', icon: 'Truck', title: 'Pickup and Delivery', description: 'Fresh pasta, pinsa, salads, desserts — all catering-ready for groups of any size.', displayOrder: 3 },
  { _id: 'b4', icon: 'ChefHat', title: 'Custom Menus', description: 'Dietary restrictions, preferences, allergies — we build a menu that works for everyone.', displayOrder: 4 },
]

export async function getCateringBenefits() {
  if (!isSanityConfigured()) return FALLBACK_BENEFITS
  return client.fetch(
    `*[_type == "cateringBenefit"] | order(displayOrder asc) { _id, icon, title, description, displayOrder }`,
    {}, REVALIDATE_LONG,
  )
}

// ─────────────────────────────────────────────
// Career Roles
// ─────────────────────────────────────────────

export async function getCareerRoles() {
  if (!isSanityConfigured()) {
    return [
      { department: 'Kitchen', roles: ['Line Cook', 'Prep Cook', 'Pastaio', 'Kitchen Manager'] },
      { department: 'Service', roles: ['Server', 'Cashier', 'Host / Hostess', 'Shift Supervisor'] },
      { department: 'Delivery', roles: ['Delivery Driver', 'Dispatch Coordinator'] },
      { department: 'Management', roles: ['Assistant Manager', 'General Manager'] },
    ]
  }
  const roles = await client.fetch(
    `*[_type == "careerRole" && active != false] | order(department asc, displayOrder asc) { department, roleTitle }`,
    {}, REVALIDATE_LONG,
  )
  const grouped: Record<string, string[]> = {}
  for (const r of roles as { department: string; roleTitle: string }[]) {
    if (!grouped[r.department]) grouped[r.department] = []
    grouped[r.department].push(r.roleTitle)
  }
  return Object.entries(grouped).map(([department, roles]) => ({ department, roles }))
}

// ─────────────────────────────────────────────
// Page Singletons
// ─────────────────────────────────────────────

export async function getHomePage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro', description: 'Authentic Italian made fresh daily.' },
      heroVideoUrl: '',
      heroHeadline: 'Crazy Good Italian Food.',
      heroSubheadline: 'Handmade pasta. Clean ingredients. No shortcuts.',
      heroBody: 'At PennePazze, everything is made fresh daily — from our pasta to our sauces. No preservatives. No seed oils. Ever.',
      heroCtaOrder: 'ORDER NOW',
      heroCtaMenu: 'VIEW MENU',
      whySection: {
        heading: 'Why PennePazze?',
        items: [
          { _key: 'w1', title: 'Brought Straight from Italy', body: 'Our founder Rony comes from a family rooted in northern Italy. He brought Ricardo — our head chef from Sicily — along with generations of recipes, real technique, and even the equipment.' },
          { _key: 'w2', title: 'Made Fresh, Every Single Day', body: 'Our pasta is rolled fresh every morning. Our sauces are made from scratch daily. If it cannot be made fresh, we do not serve it.' },
          { _key: 'w3', title: 'Clean Ingredients. Always.', body: 'We have never used seed oils. Not once. No preservatives, no artificial ingredients, no shortcuts.' },
        ],
      },
      authenticityStrip: {
        preText: 'PennePazze has always been',
        mainText: '100% Seed Oil Free. From Day One.',
        body: 'It was never a change for us — it has always been who we are. We cook with extra virgin olive oil and real ingredients because that is the Italian way.',
        signatureFrom: 'With love,',
        signatureName: 'The PennePazze Family',
      },
      howItWorksSection: {
        heading: "Italian the Way It Should Be. Faster Than You'd Expect.",
        steps: [
          { _key: 's1', number: '1', title: 'Scan and Order', body: 'Browse the full menu on your phone — beautiful photos, clear descriptions, easy customization. No waiting for a server.' },
          { _key: 's2', number: '2', title: 'We Cook Fresh', body: 'Fresh pasta dropped to order. Sauces made in-house. Every dish crafted with care, every time.' },
          { _key: 's3', number: '3', title: 'Enjoy the Moment', body: 'Our team brings your food and keeps the vibes warm. Great Italian food — no pretense, no rush.' },
        ],
      },
      gelatoBanner: {
        preText: 'Something sweet is here.',
        heading: 'Meet Gelato Pazzo.',
        body: 'Our take on authentic Italian gelato — made in-house from fresh, clean ingredients. Same PennePazze obsession. Just colder.',
        linkText: 'Discover Gelato Pazzo →',
        linkHref: '/gelato-pazzo',
      },
      storyTeaser: {
        heading: 'From Our Family to Your Table.',
        body: 'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life. Our team came straight from Italy and brought everything with them.',
        linkText: 'Read Our Full Story →',
      },
      instagramSection: {
        heading: 'Follow Along @pennepazzeofficial',
        subheading: 'Real food. Real moments. Real Italian.',
      },
    }
  }
  return client.fetch(`*[_type == "homePage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getAboutPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'About PennePazze | Authentic Italian Made Fresh in Nashville', description: 'The story behind PennePazze.' },
      heroHeading: "We're a Little Crazy About Italian Food.",
      heroSubheading: 'And we think that is exactly what it takes to do it right.',
      originStory: {
        heading: 'From Our Family to Your Table.',
        paragraphs: [
          'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life. Not the chain-restaurant version. Not the shortcut version. The real thing.',
          'Our founder Rony comes from a family rooted in northern Italy, where food is not just sustenance — it is culture, family, and identity.',
          'We brought our head chef over from Sicily — along with his family recipes, his technique, and everything that makes Sicilian and Italian cooking what it is. Our pasta machine came from Italy. Our special oven came from Italy.',
          'The result is a simple, authentic Italian experience in the heart of Nashville. Nothing fancy. Nothing pretentious. Just honest food made the right way.',
        ],
      },
      beliefsSection: {
        heading: 'What We Believe In',
        items: [
          'Fresh pasta and sauces made in-house, every single day',
          'No artificial ingredients — ever',
          'No preservatives, no seed oils — not now, not ever',
          'Quality over shortcuts — always',
          'Authentic Italian recipes and techniques, not approximations',
          'Equipment and ingredients sourced directly from Italy',
        ],
      },
      experienceSection: {
        heading: 'Fast Casual — But Make It Chef.',
        body: "PennePazze sits in that sweet spot between a quick lunch and a proper sit-down dinner. You get chef-quality food — real technique, real ingredients — at prices that will not make you wince.\n\nOrder on your phone, skip the wait, and let our team take care of everything else.",
      },
      pressQuotes: [
        { _key: 'q1', quote: 'Extremely on-point handmade pastas — one of the best Italian spots in Nashville.', attribution: '— The Infatuation' },
        { _key: 'q2', quote: 'Made to order from scratch. Takes you right to Italy.', attribution: '— Guest Review' },
      ],
      ctaSection: { heading: 'Come Hungry. Leave Happy.', buttonLabel: 'ORDER NOW' },
    }
  }
  return client.fetch(`*[_type == "aboutPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getMenuPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Menu | PennePazze — Fresh Italian in Nashville', description: 'Browse the PennePazze menu.' },
      heroHeading: 'Real Italian. No Compromises.',
      heroBody: 'From creamy carbonara to rich ragu and fresh pinsa — every dish is built on flavor, quality, and tradition.',
      freshnessStrip: ['Fresh pasta rolled daily', 'All sauces made from scratch', 'Zero seed oils, from day one', 'No preservatives or artificial ingredients'],
      orderSection: {
        heading: 'Ready to Order?',
        body: 'Scan the QR code at your table to browse our full menu with photos and descriptions. Ordering online or for pickup? Use the button below.',
        orderButtonLabel: 'ORDER ONLINE',
        specialDietsLinkText: 'View Special Diets Menu →',
        pdfLinkText: 'Download Printable Menu (PDF) →',
      },
    }
  }
  return client.fetch(`*[_type == "menuPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getCateringPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Catering & Private Events | PennePazze Nashville', description: 'Fresh Italian catering for events in Nashville and Middle Tennessee.' },
      heroHeading: 'Catering & Events',
      heroSubheading: 'We love being part of your special moments.',
      heroBody: "Fresh, Authentic Italian Food Your Guests Won't Forget.\n\nFrom weddings to private dinners to corporate lunches — we bring the PennePazze experience to you.\n\nWe handle all the food. You take all the credit.",
      offeringsSection: {
        heading: 'What We Can Do For You',
        offerings: [
          { _key: 'o1', title: 'Corporate Catering', body: 'Boxed lunches to full buffet spreads — fresh Italian that actually impresses.' },
          { _key: 'o2', title: 'Weddings and Private Events', body: 'We will work with you on a custom menu that fits your event and vision.' },
          { _key: 'o3', title: 'Pickup and Delivery', body: 'Fresh pasta, pinsa, salads, desserts — all catering-ready for groups of any size.' },
          { _key: 'o4', title: 'Custom Menus', body: 'Dietary restrictions, allergies — tell us about your guests and we build a menu that works.' },
        ],
      },
      formSection: { heading: "Let's Talk", subheading: 'Have a question? Planning an event? We are here for you.', formButtonLabel: 'SUBMIT CATERING REQUEST', callToAction: 'Or call us directly:' },
    }
  }
  return client.fetch(`*[_type == "cateringPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getGelatoPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Gelato Pazzo | Fresh Italian Gelato — by PennePazze', description: 'Fresh, handmade Italian gelato from the team behind PennePazze.' },
      heroHeading: 'Gelato Pazzo',
      heroSubheading: 'Crazy Good Italian Gelato.',
      heroBody: "From the team behind PennePazze comes something new — and something you are going to love.\n\nGelato Pazzo is our take on authentic Italian gelato, made fresh in-house every day from real, clean ingredients. No artificial flavors. No seed oils. No mystery ingredients.\n\nSame PennePazze obsession. Same zero compromises.",
      differentiators: {
        heading: 'What Makes It Different',
        items: [
          { _key: 'd1', title: 'Made In-House Daily', body: 'Every batch is made fresh on-site — not brought in pre-made.' },
          { _key: 'd2', title: 'Clean Ingredients', body: 'No seed oils. No artificial colors or flavors. Quality dairy, real fruit.' },
          { _key: 'd3', title: 'Authentically Italian', body: 'More flavor, less fat. We respect the craft and learned it the right way.' },
        ],
      },
      openNowSection: { heading: 'Now Open', buttonLabel: 'VISIT GELATO PAZZO' },
    }
  }
  return client.fetch(`*[_type == "gelatoPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getCareersPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Careers at PennePazze | Join Our Team', description: 'Join the PennePazze family across Nashville and Middle Tennessee.' },
      heroHeading: 'Come Work With Us',
      heroSubheading: 'We are growing — and we are looking for people who love food, people, and doing things right.',
      introSection: {
        heading: 'Join the PennePazze Family',
        body: "PennePazze is not just a job. It is a place where the team actually cares — about the food, the guests, and each other.\n\nWith four locations across Middle Tennessee and more on the way, we have real opportunities for front-of-house, back-of-house, and management roles.",
      },
      benefitsSection: {
        heading: "Why You'll Love Working Here",
        benefits: [
          { _key: 'b1', title: 'Real Craft', body: 'You are not reheating sauce from a bag. Fresh ingredients, scratch-made dishes, techniques that teach you something.' },
          { _key: 'b2', title: 'Good Vibes', body: 'Young, energetic team. Fast-paced but never chaotic. Good work is noticed.' },
          { _key: 'b3', title: 'Real Growth', body: 'We are expanding fast. Real opportunities to grow — from server to management, from line cook to chef.' },
          { _key: 'b4', title: 'Flexibility', body: 'We work with schedules. Students, parents, and side-hustlers are all welcome.' },
        ],
      },
      openPositionsSection: { heading: 'Open Positions', defaultMessage: 'We are always accepting applications for front-of-house, back-of-house, and management across all locations.' },
      formSection: { heading: 'Apply Now', buttonLabel: 'APPLY NOW' },
    }
  }
  return client.fetch(`*[_type == "careersPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getPressPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Press | PennePazze — Awards and Media', description: 'PennePazze — named Best Italian Restaurant in Nashville two years running.' },
      heroHeading: 'In the Press',
      heroSubheading: 'What Nashville is saying about us.',
      googleRating: { rating: '4.8 stars on Google', description: 'across thousands of reviews from Nashville and Murfreesboro guests.' },
      mediaContactSection: { heading: 'Press Inquiries', body: 'For press inquiries, partnership opportunities, or media requests:', email: 'Shirnach@gmail.com' },
    }
  }
  return client.fetch(`*[_type == "pressPage"][0]`, {}, REVALIDATE_SHORT)
}

export async function getContactPage() {
  if (!isSanityConfigured()) {
    return {
      seo: { title: 'Contact PennePazze | Nashville, Murfreesboro, Germantown and Franklin', description: 'Contact PennePazze for general inquiries, catering requests, or just to say hello.' },
      heroHeading: "Let's Talk",
      heroSubheading: 'Have a question? Planning an event? We are here for you.',
      formSection: { heading: 'Send Us a Message', buttonLabel: 'Send Message' },
      followUs: { heading: 'Follow Us' },
      orderButtons: { nashvilleLabel: 'ORDER NASHVILLE', murfreesboroLabel: 'ORDER MURFREESBORO' },
    }
  }
  return client.fetch(`*[_type == "contactPage"][0]`, {}, REVALIDATE_SHORT)
}
