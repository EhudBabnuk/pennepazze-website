import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'why', title: 'Why PennePazze' },
    { name: 'authenticity', title: 'Seed Oil Strip' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'gelato', title: 'Gelato Banner' },
    { name: 'story', title: 'Story Teaser' },
    { name: 'instagram', title: 'Instagram Strip' },
  ],
  fields: [
    // ─── SEO ───────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Authentic Italian made fresh daily by a team straight from Italy. Handmade pasta, house-crafted sauces, never any seed oils. Fast casual dining in Nashville and Murfreesboro.' }),
      ],
    }),

    // ─── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL',
      type: 'url',
      group: 'hero',
      description: 'Vimeo or video URL for the full-screen hero background.',
    }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'hero', initialValue: 'Crazy Good Italian Food.' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Sub-headline', type: 'string', group: 'hero', initialValue: 'Handmade pasta. Clean ingredients. No shortcuts.' }),
    defineField({ name: 'heroBody', title: 'Hero Body Text', type: 'text', rows: 3, group: 'hero', initialValue: "At PennePazze, everything is made fresh daily — from our pasta to our sauces. No preservatives. No seed oils. Ever. Just real Italian comfort food done right." }),
    defineField({ name: 'heroCtaOrder', title: 'Hero Button 1 Label', type: 'string', group: 'hero', initialValue: 'ORDER NOW' }),
    defineField({ name: 'heroCtaMenu', title: 'Hero Button 2 Label', type: 'string', group: 'hero', initialValue: 'VIEW MENU' }),

    // ─── Why PennePazze ─────────────────────────────────────
    defineField({
      name: 'whySection',
      title: '"Why PennePazze" Section',
      type: 'object',
      group: 'why',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Why PennePazze?' }),
        defineField({
          name: 'items',
          title: 'Items (3 columns)',
          type: 'array',
          of: [{
            type: 'object',
            name: 'whyItem',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
            ],
            preview: { select: { title: 'title' } },
          }],
        }),
      ],
    }),

    // ─── Authenticity / Seed Oil Strip ──────────────────────
    defineField({
      name: 'authenticityStrip',
      title: 'Seed Oil Strip',
      type: 'object',
      group: 'authenticity',
      description: 'The full-width warm-toned band about being 100% seed oil free.',
      fields: [
        defineField({ name: 'preText', title: 'Pre-text', type: 'string', description: 'Small line above the main text.', initialValue: 'PennePazze has always been' }),
        defineField({ name: 'mainText', title: 'Main Text', type: 'string', initialValue: '100% Seed Oil Free. From Day One.' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, initialValue: 'It was never a change for us — it has always been who we are. We cook with extra virgin olive oil and real ingredients because that is the Italian way. Clean cooking is not a trend here. It is the foundation.' }),
        defineField({ name: 'signatureFrom', title: 'Signature Line', type: 'string', initialValue: 'With love,' }),
        defineField({ name: 'signatureName', title: 'Signature Name', type: 'string', initialValue: 'The PennePazze Family' }),
      ],
    }),

    // ─── How It Works ────────────────────────────────────────
    defineField({
      name: 'howItWorksSection',
      title: '"How It Works" Section',
      type: 'object',
      group: 'howItWorks',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: "Italian the Way It Should Be. Faster Than You'd Expect." }),
        defineField({
          name: 'steps',
          title: 'Steps (3 items)',
          type: 'array',
          of: [{
            type: 'object',
            name: 'step',
            fields: [
              defineField({ name: 'number', title: 'Step Number', type: 'string' }),
              defineField({ name: 'title', title: 'Step Title', type: 'string' }),
              defineField({ name: 'body', title: 'Step Body', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'title', subtitle: 'number' } },
          }],
        }),
      ],
    }),

    // ─── Gelato Banner ───────────────────────────────────────
    defineField({
      name: 'gelatoBanner',
      title: 'Gelato Pazzo Banner',
      type: 'object',
      group: 'gelato',
      description: 'The banner linking to Gelato Pazzo.',
      fields: [
        defineField({ name: 'preText', title: 'Pre-text', type: 'string', initialValue: 'Something sweet is here.' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Meet Gelato Pazzo.' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, initialValue: 'Our take on authentic Italian gelato — made in-house from fresh, clean ingredients. Same PennePazze obsession. Same zero compromises. Just colder.' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Discover Gelato Pazzo →' }),
        defineField({ name: 'linkHref', title: 'Link URL', type: 'string', initialValue: '/gelato-pazzo' }),
      ],
    }),

    // ─── Story Teaser ────────────────────────────────────────
    defineField({
      name: 'storyTeaser',
      title: 'Our Story Teaser',
      type: 'object',
      group: 'story',
      description: 'The left-text / right-image split section.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'From Our Family to Your Table.' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, initialValue: 'PennePazze started with a simple idea — bring real Italian food, made from scratch, to everyday life. Our team came straight from Italy and brought everything with them: the recipes, the technique, the culture, and even the equipment.' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Read Our Full Story →' }),
        defineField({ name: 'image', title: 'Story Image', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // ─── Instagram Strip ────────────────────────────────────
    defineField({
      name: 'instagramSection',
      title: 'Instagram Feed Strip',
      type: 'object',
      group: 'instagram',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Follow Along @pennepazzeofficial' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Real food. Real moments. Real Italian.' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
