/**
 * Seed script — populates Sanity with content from PennePazze_Website_Copy_v3.docx
 *
 * Run: npx tsx scripts/seed-content.ts
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function upsert(doc: Record<string, unknown>) {
  try {
    await client.createOrReplace(doc as never)
    console.log(`  ✓  ${doc._type} → ${doc._id}`)
  } catch (err) {
    console.error(`  ✗  ${doc._type} → ${doc._id}:`, (err as Error).message)
  }
}

async function seed() {
  console.log('\n🌱  Seeding PennePazze CMS from website copy document...\n')

  // ═══════════════════════════════════════════════
  // SITE SETTINGS
  // ═══════════════════════════════════════════════
  console.log('▸ Site Settings')
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    restaurantName: 'PennePazze',
    tagline: 'Crazy Good Italian. Made Fresh. No Compromises.',
    footerTagline: 'Crazy good Italian cuisine. Made fresh. No compromises.',
    footerAbout: 'Real ingredients. Real recipes. Brought straight from Italy — and growing across Middle Tennessee.',
    copyright: '© 2025 PennePazze. All rights reserved. Crazy Good Italian Cuisine.',
    social: {
      instagramHandle: '@pennepazzeofficial',
      tiktokHandle: '@pennepazze',
      // Full URLs: add when setting up social accounts
      // instagram: 'https://instagram.com/pennepazzeofficial',
      // facebook: 'https://facebook.com/pennepazze',
      // tiktok: 'https://tiktok.com/@pennepazze',
    },
    pressEmail: 'Shirnach@gmail.com',
    newsletter: {
      heading: 'Stay in the Loop',
      body: 'New locations, seasonal specials, and behind-the-scenes stories — straight to your inbox. No spam, just pasta.',
    },
    seo: {
      title: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro',
      description: 'Authentic Italian made fresh daily by a team straight from Italy. Handmade pasta, house-crafted sauces, never any seed oils. Fast casual dining in Nashville and Murfreesboro.',
    },
  })

  // ═══════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Home Page')
  await upsert({
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      title: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro',
      description: 'Authentic Italian made fresh daily by a team straight from Italy. Handmade pasta, house-crafted sauces, never any seed oils. Fast casual dining in Nashville and Murfreesboro.',
    },
    heroVideoUrl: 'https://player.vimeo.com/video/750022321?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0',
    heroHeadline: 'Crazy Good Italian Food.',
    heroSubheadline: 'Handmade pasta. Clean ingredients. No shortcuts.',
    heroBody: 'At PennePazze, everything is made fresh daily — from our pasta to our sauces. No preservatives. No seed oils. Ever. Just real Italian comfort food done right.',
    heroCtaOrder: 'ORDER NOW',
    heroCtaMenu: 'VIEW MENU',
    whySection: {
      heading: 'Why PennePazze?',
      items: [
        {
          _key: 'why-1',
          title: 'Brought Straight from Italy',
          body: 'Our founder Rony comes from a family rooted in northern Italy, where food is not a hobby — it is a way of life. To bring that same spirit to Nashville, he brought Ricardo with him: our head chef, restaurant manager, and pizzaiolo, who came straight from Sicily carrying generations of recipes, real technique, and an uncompromising love for Italian food. Even our pasta machine, oven and most of our equipment made the journey too — imported directly from Italy, because some things you just cannot replicate.',
        },
        {
          _key: 'why-2',
          title: 'Made Fresh, Every Single Day',
          body: 'Our pasta is rolled fresh every morning. Our sauces are made from scratch daily. Our pinsa dough follows an authentic Italian process that takes time and cannot be rushed. If it cannot be made fresh, we do not serve it.',
        },
        {
          _key: 'why-3',
          title: 'Clean Ingredients. Always.',
          body: 'We have never used seed oils. Not once. We have always cooked with real, wholesome ingredients — the kind we serve our own families. No preservatives, no artificial ingredients, no shortcuts.',
        },
      ],
    },
    authenticityStrip: {
      preText: 'PennePazze has always been',
      mainText: '100% Seed Oil Free. From Day One.',
      body: 'It was never a change for us — it has always been who we are. We cook with extra virgin olive oil and real ingredients because that is the Italian way. Clean cooking is not a trend here. It is the foundation.',
      signatureFrom: 'With love,',
      signatureName: 'The PennePazze Family',
    },
    howItWorksSection: {
      heading: "Italian the Way It Should Be. Faster Than You'd Expect.",
      steps: [
        { _key: 'step-1', number: '1', title: 'Scan and Order', body: 'Browse the full menu right on your phone — beautiful photos, clear descriptions, easy customization. No waiting for a server to take your order.' },
        { _key: 'step-2', number: '2', title: 'We Cook Fresh', body: 'Your order goes straight to the kitchen. Fresh pasta dropped to order. Sauces made in-house. Every dish crafted with care, every time.' },
        { _key: 'step-3', number: '3', title: 'Enjoy the Moment', body: 'Our team brings your food, keeps the vibes warm, and makes sure you are taken care of. Great Italian food — no pretense, no rush.' },
      ],
    },
    gelatoBanner: {
      preText: 'Something sweet is here.',
      heading: 'Meet Gelato Pazzo.',
      body: 'Our take on authentic Italian gelato — made in-house from fresh, clean ingredients. Same PennePazze obsession. Same zero compromises. Just colder.',
      linkText: 'Discover Gelato Pazzo →',
      linkHref: '/gelato-pazzo',
    },
    storyTeaser: {
      heading: 'From Our Family to Your Table.',
      body: 'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life. Our team came straight from Italy and brought everything with them: the recipes, the technique, the culture, and even the equipment.',
      linkText: 'Read Our Full Story →',
    },
    instagramSection: {
      heading: 'Follow Along @pennepazzeofficial',
      subheading: 'Real food. Real moments. Real Italian.',
    },
  })

  // ═══════════════════════════════════════════════
  // ABOUT PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ About Page')
  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    seo: {
      title: 'About PennePazze | Authentic Italian Made Fresh in Nashville',
      description: 'The story behind PennePazze — brought to Nashville by an Italian founder and a pastaio from Sicily, with equipment imported from Italy and recipes rooted in real Italian tradition.',
    },
    heroHeading: "We're a Little Crazy About Italian Food.",
    heroSubheading: 'And we think that is exactly what it takes to do it right.',
    originStory: {
      heading: 'From Our Family to Your Table.',
      paragraphs: [
        'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life. Not the chain-restaurant version. Not the shortcut version. The real thing.',
        'Our founder Rony comes from a family rooted in northern Italy, where food is not just sustenance — it is culture, family, and identity. When he brought PennePazze to Nashville, he did not try to recreate Italian food from memory. He brought Italy to Nashville.',
        'We brought our head chef over from Sicily — along with his family recipes, his technique, and everything that makes Sicilian and Italian cooking what it is. Our pasta machine came from Italy. Our special oven came from Italy. The culture, the care, the way we approach every dish — all of it is rooted in the real thing.',
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
      body: "PennePazze sits in that sweet spot between a quick lunch and a proper sit-down dinner. You get chef-quality food — real technique, real ingredients — at prices that will not make you wince.\n\nOrder on your phone, skip the wait, and let our team take care of everything else. Short wait times. Lively atmosphere. No dress code. Whether you are grabbing a solo lunch, eating with the family, or taking a date somewhere genuinely impressive — PennePazze is your place.",
    },
    pressQuotes: [
      {
        _key: 'quote-1',
        quote: 'Extremely on-point handmade pastas — one of the best Italian spots in Nashville.',
        attribution: '— The Infatuation',
      },
      {
        _key: 'quote-2',
        quote: 'Made to order from scratch. Takes you right to Italy.',
        attribution: '— Guest Review',
      },
    ],
    ctaSection: {
      heading: 'Come Hungry. Leave Happy.',
      buttonLabel: 'ORDER NOW',
    },
  })

  // ═══════════════════════════════════════════════
  // MENU PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Menu Page')
  await upsert({
    _id: 'menuPage',
    _type: 'menuPage',
    seo: {
      title: 'Menu | PennePazze — Fresh Italian Pasta and Pinsa in Nashville',
      description: 'Browse the PennePazze menu — handmade fresh pasta, authentic Roman pinsa, chef-crafted sauces, and Italian desserts. No seed oils. No preservatives. Made fresh daily in Nashville and Murfreesboro.',
    },
    heroHeading: 'Real Italian. No Compromises.',
    heroBody: 'From creamy carbonara to rich ragu and fresh pinsa — every dish is built on flavor, quality, and tradition.',
    freshnessStrip: [
      'Fresh pasta rolled daily',
      'All sauces made from scratch',
      'Zero seed oils, from day one',
      'No preservatives or artificial ingredients',
    ],
    orderSection: {
      heading: 'Ready to Order?',
      body: 'Scan the QR code at your table to browse our full menu with photos and descriptions. Ordering online or for pickup? Use the button below.',
      orderButtonLabel: 'ORDER ONLINE',
      specialDietsLinkText: 'View Special Diets Menu →',
      pdfLinkText: 'Download Printable Menu (PDF) →',
      // specialDietsUrl and pdfUrl: [Owner: add URLs]
    },
  })

  // ═══════════════════════════════════════════════
  // CATERING PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Catering Page')
  await upsert({
    _id: 'cateringPage',
    _type: 'cateringPage',
    seo: {
      title: 'Catering & Private Events | PennePazze Italian Catering Nashville',
      description: 'Fresh Italian catering for corporate events, weddings, and private gatherings in Nashville and Middle Tennessee. Handmade pasta and chef-crafted dishes, made fresh for your event.',
    },
    heroHeading: 'Catering & Events',
    heroSubheading: 'We love being part of your special moments.',
    heroBody: "Fresh, Authentic Italian Food Your Guests Won't Forget.\n\nFrom weddings to private dinners to corporate lunches — we bring the PennePazze experience to you. Fresh ingredients, house-made dishes, and the kind of food that makes people stop mid-conversation to ask what they just ate.\n\nWe handle all the food. You take all the credit.\n\nFlavors that leave a lasting impression.",
    offeringsSection: {
      heading: 'What We Can Do For You',
      offerings: [
        {
          _key: 'offering-1',
          title: 'Corporate Catering',
          body: 'Boxed lunches to full buffet spreads — fresh Italian that actually impresses. Perfect for team lunches, client events, and company gatherings across Nashville and Middle Tennessee.',
        },
        {
          _key: 'offering-2',
          title: 'Weddings and Private Events',
          body: 'Planning something special? We will work with you on a custom menu that fits your event, your guests, and your vision.',
        },
        {
          _key: 'offering-3',
          title: 'Pickup and Delivery',
          body: 'Order in advance for easy pickup or delivery. Fresh pasta, pinsa, salads, desserts — all catering-ready, available for groups of any size.',
        },
        {
          _key: 'offering-4',
          title: 'Custom Menus',
          body: 'Dietary restrictions, preferences, allergies — tell us about your guests and we will build a menu that works for everyone.',
        },
      ],
    },
    formSection: {
      heading: "Let's Talk",
      subheading: 'Have a question? Planning an event? We are here for you.',
      formButtonLabel: 'SUBMIT CATERING REQUEST',
      callToAction: 'Or call us directly:',
      // phoneNashville: '[Owner: add Nashville catering phone]',
      // phoneMurfreesboro: '[Owner: add Murfreesboro catering phone]',
    },
  })

  // ═══════════════════════════════════════════════
  // GELATO PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Gelato Pazzo Page')
  await upsert({
    _id: 'gelatoPage',
    _type: 'gelatoPage',
    seo: {
      title: 'Gelato Pazzo | Fresh Italian Gelato — by PennePazze',
      description: 'Introducing Gelato Pazzo — fresh, handmade Italian gelato from the team behind PennePazze. Same obsession with clean ingredients. Made in-house daily. Just colder.',
    },
    heroHeading: 'Gelato Pazzo',
    heroSubheading: 'Crazy Good Italian Gelato.',
    heroBody: "From the team behind PennePazze comes something new — and something you are going to love.\n\nGelato Pazzo is our take on authentic Italian gelato, made fresh in-house every day from real, clean ingredients. No artificial flavors. No seed oils. No mystery ingredients. Just pure, intensely flavored gelato crafted the Italian way.\n\nSame PennePazze obsession. Same zero compromises.",
    differentiators: {
      heading: 'What Makes It Different',
      items: [
        {
          _key: 'diff-1',
          title: 'Made In-House Daily',
          body: 'Every batch is made fresh on-site. We do not bring in pre-made gelato — we make it ourselves, every day, from scratch.',
        },
        {
          _key: 'diff-2',
          title: 'Clean Ingredients',
          body: 'No seed oils. No artificial colors or flavors. No unnecessary additives. Quality dairy, real fruit, ingredients you can actually recognize.',
        },
        {
          _key: 'diff-3',
          title: 'Authentically Italian',
          body: 'Gelato is not ice cream. More flavor, less fat, a texture that is uniquely its own. We respect the craft — and we learned it the right way.',
        },
      ],
    },
    openNowSection: {
      heading: 'Now Open',
      // address: '[Owner: add Gelato Pazzo address once confirmed]',
      buttonLabel: 'VISIT GELATO PAZZO',
      // externalUrl: '[Owner: add gelatopazzo.com URL once live]',
    },
  })

  // ═══════════════════════════════════════════════
  // CAREERS PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Careers Page')
  await upsert({
    _id: 'careersPage',
    _type: 'careersPage',
    seo: {
      title: 'Careers at PennePazze | Join Our Team in Nashville and Murfreesboro',
      description: 'Join the PennePazze family. We are growing fast and looking for passionate, hardworking people for our Nashville, Murfreesboro, Germantown, and Franklin locations.',
    },
    heroHeading: 'Come Work With Us',
    heroSubheading: 'We are growing — and we are looking for people who love food, people, and doing things right.',
    introSection: {
      heading: 'Join the PennePazze Family',
      body: "PennePazze is not just a job. It is a place where the team actually cares — about the food, the guests, and each other.\n\nWith four locations across Middle Tennessee and more on the way, we have real opportunities for front-of-house, back-of-house, and management roles.",
    },
    benefitsSection: {
      heading: "Why You'll Love Working Here",
      benefits: [
        { _key: 'benefit-1', title: 'Real Craft', body: 'You are not reheating sauce from a bag. You are working with fresh ingredients, scratch-made dishes, and techniques that actually teach you something.' },
        { _key: 'benefit-2', title: 'Good Vibes', body: 'Young, energetic team. Fast-paced but never chaotic. A fun environment where good work is noticed.' },
        { _key: 'benefit-3', title: 'Real Growth', body: 'We are expanding fast. Real opportunities to grow — from server to management, from line cook to chef.' },
        { _key: 'benefit-4', title: 'Flexibility', body: 'We work with schedules. Students, parents, and side-hustlers are all welcome.' },
      ],
    },
    openPositionsSection: {
      heading: 'Open Positions',
      defaultMessage: 'We are always accepting applications for front-of-house, back-of-house, and management across all locations. Great people are always welcome.',
    },
    formSection: {
      heading: 'Apply Now',
      buttonLabel: 'APPLY NOW',
    },
  })

  // ═══════════════════════════════════════════════
  // PRESS PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Press Page')
  await upsert({
    _id: 'pressPage',
    _type: 'pressPage',
    seo: {
      title: 'Press | PennePazze — Awards and Media',
      description: 'PennePazze — named Best Italian Restaurant in Nashville by Nashville Scene two years running. Featured in The Infatuation, Nashville Go, and more.',
    },
    heroHeading: 'In the Press',
    heroSubheading: 'What Nashville is saying about us.',
    googleRating: {
      rating: '4.8 stars on Google',
      description: 'across thousands of reviews from Nashville and Murfreesboro guests.',
    },
    mediaContactSection: {
      heading: 'Press Inquiries',
      body: 'For press inquiries, partnership opportunities, or media requests:',
      email: 'Shirnach@gmail.com',
    },
  })

  // ═══════════════════════════════════════════════
  // CONTACT PAGE
  // ═══════════════════════════════════════════════
  console.log('\n▸ Contact Page')
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    seo: {
      title: 'Contact PennePazze | Nashville, Murfreesboro, Germantown and Franklin',
      description: 'Contact PennePazze for general inquiries, catering requests, or just to say hello. Four locations across Middle Tennessee.',
    },
    heroHeading: "Let's Talk",
    heroSubheading: 'Have a question? Planning an event? We are here for you.',
    formSection: {
      heading: 'Send Us a Message',
      buttonLabel: 'Send Message',
    },
    followUs: { heading: 'Follow Us' },
    orderButtons: {
      nashvilleLabel: 'ORDER NASHVILLE',
      murfreesboroLabel: 'ORDER MURFREESBORO',
      // nashvilleUrl: '[Owner: add order URL]',
      // murfreesboroUrl: '[Owner: add order URL]',
    },
  })

  // ═══════════════════════════════════════════════
  // LOCATIONS
  // ═══════════════════════════════════════════════
  console.log('\n▸ Locations')
  const locations = [
    {
      _id: 'location-nashville-ll',
      _type: 'location',
      name: 'Nashville — L&L Market',
      slug: { _type: 'slug', current: 'nashville-ll' },
      status: 'open',
      neighborhood: "L&L Market · Charlotte Ave",
      city: 'Nashville',
      state: 'TN',
      address: '3826 Charlotte Ave, Nashville, TN 37209',
      phone: '(615) 285-3357',
      hours: {
        weekdays: 'Tue–Sun 11am – 9:30pm',
        notes: 'Happy Hour Mon–Fri 2–5 PM',
      },
      tagline: 'Where it all started.',
      description: 'Our original home. Tucked inside the vibrant L&L Market in Sylvan Park, this is where PennePazze was born — and where we still make every dish the same way we always have.\n\nOpen kitchen, outdoor patio, dogs welcome on the patio. A lively, unpretentious atmosphere where great food is always the main event.',
      features: ['Dine-in', 'Pickup', 'Delivery', 'Happy Hour', 'Outdoor Patio', 'Dog Friendly'],
      // googleMapsUrl: '[Owner: add Google Maps link]',
      // orderLink: '[Owner: add order URL]',
      featured: true,
      hasEmailSignup: false,
      displayOrder: 1,
    },
    {
      _id: 'location-nashville-germantown',
      _type: 'location',
      name: 'Nashville — Germantown',
      slug: { _type: 'slug', current: 'nashville-germantown' },
      status: 'opening-soon',
      neighborhood: 'Germantown',
      city: 'Nashville',
      state: 'TN',
      address: '820 4th Avenue North, Nashville, TN 37219',
      // phone: '[Owner: add phone when confirmed]',
      tagline: 'Opening Soon.',
      description: "One of Nashville's most vibrant neighborhoods is about to get a little more Italian.\n\nWe are bringing PennePazze to Germantown — Nashville's most exciting food neighborhood. Same handmade pasta. Same scratch-made sauces. Same commitment to clean, real ingredients. Opening very soon.",
      features: ['Dine-in', 'Pickup', 'Delivery'],
      // googleMapsUrl: '[Owner: add Google Maps link]',
      featured: true,
      hasEmailSignup: true,
      openingNote: 'Opening very soon. Sign up to be the first to know.',
      displayOrder: 2,
    },
    {
      _id: 'location-murfreesboro',
      _type: 'location',
      name: 'Murfreesboro',
      slug: { _type: 'slug', current: 'murfreesboro' },
      status: 'open',
      city: 'Murfreesboro',
      state: 'TN',
      address: '1430 Medical Center Parkway, Murfreesboro TN 37129',
      phone: '(615) 266-0641',
      hours: {
        weekdays: 'Tue–Sun 11am – 9:30pm',
        notes: 'Happy Hour Mon–Fri 2–5 PM',
      },
      tagline: 'Same crazy-good Italian. Closer to home.',
      description: 'We heard you — and we brought PennePazze to Murfreesboro. Everything you love: fresh pasta rolled every morning, sauces made from scratch, clean ingredients, and the same relaxed, welcoming atmosphere that made our Nashville location a local favorite.',
      features: ['Dine-in', 'Pickup', 'Delivery', 'Happy Hour'],
      // googleMapsUrl: '[Owner: add Google Maps link]',
      // orderLink: '[Owner: add order URL]',
      featured: true,
      hasEmailSignup: false,
      displayOrder: 3,
    },
    {
      _id: 'location-franklin',
      _type: 'location',
      name: 'Franklin',
      slug: { _type: 'slug', current: 'franklin' },
      status: 'coming-soon',
      city: 'Franklin',
      state: 'TN',
      // address: '[Owner: add when confirmed]',
      tagline: 'Coming Soon.',
      description: 'We are growing — and Franklin is next. Same fresh pasta, same clean ingredients, same crazy-good Italian food.\n\nOur fourth location is on its way to Franklin, expected to open end of 2026 or early 2027. We cannot wait to bring PennePazze to Williamson County.',
      features: ['Dine-in', 'Pickup', 'Delivery'],
      featured: true,
      hasEmailSignup: true,
      openingNote: 'Expected end of 2026 / early 2027.',
      displayOrder: 4,
    },
  ]
  for (const loc of locations) await upsert(loc)

  // ═══════════════════════════════════════════════
  // AWARDS
  // ═══════════════════════════════════════════════
  console.log('\n▸ Awards')
  const awards = [
    {
      _id: 'award-nashville-scene-2025',
      _type: 'award',
      source: 'Nashville Scene — Best Italian Restaurant',
      year: 2025,
      ranking: '#2 Best Italian in Nashville, 2025',
      description: 'For the second year in a row, Nashville Scene readers named PennePazze one of the best Italian restaurants in the city.',
      featured: true,
      displayOrder: 1,
    },
    {
      _id: 'award-nashville-scene-2024',
      _type: 'award',
      source: 'Nashville Scene — Best Italian Restaurant',
      year: 2024,
      ranking: '#3 Best Italian in Nashville, 2024',
      description: 'Our first year in the Nashville Scene Best of Nashville rankings — and we came in third. We have been working our way up ever since.',
      featured: true,
      displayOrder: 2,
    },
    {
      _id: 'award-google',
      _type: 'award',
      source: 'Google Reviews',
      year: 2025,
      ranking: '4.8 stars on Google',
      description: 'Across thousands of reviews from Nashville and Murfreesboro guests.',
      featured: true,
      displayOrder: 3,
    },
  ]
  for (const a of awards) await upsert(a)

  // ═══════════════════════════════════════════════
  // PRESS ARTICLES
  // ═══════════════════════════════════════════════
  console.log('\n▸ Press Articles')
  const pressArticles = [
    {
      _id: 'press-infatuation',
      _type: 'pressArticle',
      publication: 'The Infatuation',
      pullQuote: 'Tucked into L&L Market in Sylvan Heights, making extremely on-point handmade pastas.',
      linkText: 'Read the Review →',
      logoText: 'THE INFATUATION',
      // link: '[Owner: add article URL]',
      featured: true,
      displayOrder: 1,
    },
    {
      _id: 'press-nashville-go',
      _type: 'pressArticle',
      publication: 'Nashville Go',
      pullQuote: 'PennePazze is an authentic, laid-back Italian eatery — a local favorite in Sylvan Park.',
      linkText: 'Read the Article →',
      logoText: 'NASHVILLE GO',
      // link: '[Owner: add article URL]',
      featured: true,
      displayOrder: 2,
    },
    {
      _id: 'press-yelp',
      _type: 'pressArticle',
      publication: 'Yelp Nashville',
      pullQuote: 'Consistently among Nashville\'s highest-rated Italian restaurants, with hundreds of reviews praising the fresh pasta, authentic flavors, and welcoming atmosphere.',
      logoText: 'YELP',
      featured: false,
      displayOrder: 3,
    },
  ]
  for (const p of pressArticles) await upsert(p)

  // ═══════════════════════════════════════════════
  // NEWS CAROUSEL SLIDES
  // ═══════════════════════════════════════════════
  console.log('\n▸ News Carousel Slides')
  const slides = [
    {
      _id: 'slide-germantown',
      _type: 'updatesSlide',
      label: 'COMING SOON',
      title: 'Germantown Opening Soon',
      description: 'PennePazze is coming to Nashville\'s Germantown neighborhood. Stay tuned for the grand opening date.',
      buttonText: 'Learn More →',
      buttonLink: '/locations/nashville-germantown',
      displayOrder: 1,
    },
    {
      _id: 'slide-gelato',
      _type: 'updatesSlide',
      label: 'NEW',
      title: 'Gelato Pazzo is Open',
      description: 'Fresh Italian gelato, made in-house from real ingredients. A new obsession from the PennePazze family.',
      buttonText: 'Discover Gelato Pazzo →',
      buttonLink: '/gelato-pazzo',
      displayOrder: 2,
    },
    {
      _id: 'slide-award',
      _type: 'updatesSlide',
      label: 'AWARD',
      title: '#2 Best Italian in Nashville 2025',
      description: 'We were just named #2 Best Italian Restaurant in Nashville by Nashville Scene — for the second year in a row. Thank you, Nashville.',
      buttonText: 'Read More →',
      buttonLink: '/press',
      displayOrder: 3,
    },
  ]
  for (const s of slides) await upsert(s)

  // ═══════════════════════════════════════════════
  // MENU CATEGORIES
  // ═══════════════════════════════════════════════
  console.log('\n▸ Menu Categories')
  const categories = [
    {
      _id: 'cat-fresh-pasta',
      _type: 'menuCategory',
      name: 'Fresh Pasta',
      slug: { _type: 'slug', current: 'fresh-pasta' },
      description: 'This is what we are known for. Every pasta shape rolled fresh each morning using house-made dough, crafted by our pastaio who brought his recipes and technique straight from Sicily. Sauces made daily from scratch — no shortcuts, no jars. Made to order, every time.',
      highlightedItems: ['Carbonara Pazza', 'Campanelle Pazze', 'Crema di Broccoli', 'Nonna Paula', 'Gnocchi Crema di Gorgonzola', 'Ragu e Funghi'],
      displayOrder: 1,
    },
    {
      _id: 'cat-pinsa',
      _type: 'menuCategory',
      name: 'Pinsa Romana',
      slug: { _type: 'slug', current: 'pinsa-romana' },
      description: 'An ancient Roman recipe baked in our special oven, imported directly from Italy. A lighter, crispier, more digestible base than regular pizza — the result of a slow, authentic dough process you cannot rush. Hand-stretched, simply topped, built on quality.',
      highlightedItems: ['Pinsa Maiala', 'Pinsa Maleducata'],
      displayOrder: 2,
    },
    {
      _id: 'cat-lasagna',
      _type: 'menuCategory',
      name: 'Lasagna',
      slug: { _type: 'slug', current: 'lasagna' },
      description: 'The real kind. Layers of house-made pasta, slow-cooked ragu, and rich bechamel — baked until golden. Made from scratch, just like it should be.',
      displayOrder: 3,
    },
    {
      _id: 'cat-salads',
      _type: 'menuCategory',
      name: 'Salads',
      slug: { _type: 'slug', current: 'salads' },
      description: 'Fresh, seasonal, and actually satisfying. House-made dressings and Italian-inspired ingredients.',
      displayOrder: 4,
    },
    {
      _id: 'cat-desserts',
      _type: 'menuCategory',
      name: 'Desserts',
      slug: { _type: 'slug', current: 'desserts' },
      description: 'End on a high note. Our desserts are made in-house — classic Italian recipes, done properly. The tiramisu is everything.',
      highlightedItems: ['Tiramisu', 'Panna Cotta', 'Cannoli'],
      displayOrder: 5,
    },
    {
      _id: 'cat-drinks',
      _type: 'menuCategory',
      name: 'Drinks',
      slug: { _type: 'slug', current: 'drinks' },
      description: 'Italian sodas, fresh lemonade, house wine, craft beer, espresso, and cappuccino. Our bottomless house-made cream soda is a fan favorite.',
      displayOrder: 6,
    },
  ]
  for (const c of categories) await upsert(c)

  // ═══════════════════════════════════════════════
  // CATERING OFFERINGS (Benefit Cards)
  // ═══════════════════════════════════════════════
  console.log('\n▸ Catering Offerings')
  const offerings = [
    { _id: 'catering-corporate', _type: 'cateringBenefit', icon: 'Briefcase', title: 'Corporate Catering', description: 'Boxed lunches to full buffet spreads — fresh Italian that actually impresses. Perfect for team lunches, client events, and company gatherings.', displayOrder: 1 },
    { _id: 'catering-weddings', _type: 'cateringBenefit', icon: 'Heart', title: 'Weddings and Private Events', description: 'Planning something special? We will work with you on a custom menu that fits your event, your guests, and your vision.', displayOrder: 2 },
    { _id: 'catering-pickup', _type: 'cateringBenefit', icon: 'Truck', title: 'Pickup and Delivery', description: 'Order in advance for easy pickup or delivery. Fresh pasta, pinsa, salads, desserts — all catering-ready, available for groups of any size.', displayOrder: 3 },
    { _id: 'catering-custom', _type: 'cateringBenefit', icon: 'ChefHat', title: 'Custom Menus', description: 'Dietary restrictions, preferences, allergies — tell us about your guests and we will build a menu that works for everyone.', displayOrder: 4 },
  ]
  for (const o of offerings) await upsert(o)

  // ═══════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════
  console.log('\n✅  Seeding complete!\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('⚠️   FIELDS REQUIRING OWNER INPUT:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')
  console.log('  HERO VIDEO')
  console.log('  • Home Page → Hero Background Video URL (Vimeo embed)')
  console.log('')
  console.log('  LOCATIONS — all need Google Maps links and order links')
  console.log('  • Nashville L&L    → Google Maps URL')
  console.log('  • Nashville L&L    → Online Order URL')
  console.log('  • Germantown       → Phone number')
  console.log('  • Germantown       → Opening hours (when open)')
  console.log('  • Germantown       → Google Maps URL')
  console.log('  • Murfreesboro     → Google Maps URL')
  console.log('  • Murfreesboro     → Online Order URL')
  console.log('  • Franklin         → Street address')
  console.log('  • Franklin         → Phone number')
  console.log('  • Franklin         → Google Maps URL')
  console.log('')
  console.log('  SOCIAL MEDIA')
  console.log('  • Site Settings → Instagram URL (full https:// link)')
  console.log('  • Site Settings → Facebook URL (full https:// link)')
  console.log('  • Site Settings → TikTok URL (full https:// link)')
  console.log('')
  console.log('  CATERING')
  console.log('  • Catering Page → Nashville phone number')
  console.log('  • Catering Page → Murfreesboro phone number')
  console.log('  • Contact Page  → Nashville order URL')
  console.log('  • Contact Page  → Murfreesboro order URL')
  console.log('')
  console.log('  PRESS ARTICLES')
  console.log('  • The Infatuation → Article URL')
  console.log('  • Nashville Go    → Article URL')
  console.log('')
  console.log('  GELATO PAZZO')
  console.log('  • Gelato Page → Address (when confirmed)')
  console.log('  • Gelato Page → External website URL (gelatopazzo.com)')
  console.log('')
  console.log('  MENU')
  console.log('  • Menu Page → Special Diets Menu URL')
  console.log('  • Menu Page → Printable Menu PDF URL')
  console.log('  • All Menu Items → need to be added to Sanity Studio')
  console.log('  • All Menu Items → Photos (upload via Studio)')
  console.log('')
  console.log('  CAREERS')
  console.log('  • Current open roles → add via Studio → Career Roles')
  console.log('')
  console.log('  IMAGES')
  console.log('  • All location photos → upload via Studio')
  console.log('  • Hero image (About, Catering, Careers) → upload via Studio')
  console.log('  • News carousel slide images → upload via Studio')
  console.log('  • Award badge graphics → upload via Studio')
  console.log('  • Press publication logos → upload via Studio')
  console.log('')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err)
  process.exit(1)
})
