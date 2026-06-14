import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurantName',
      title: 'Restaurant Name',
      type: 'string',
      description: 'Full restaurant name as it appears on the website.',
      initialValue: 'PennePazze',
    }),
    defineField({
      name: 'tagline',
      title: 'Main Tagline',
      type: 'string',
      description: 'Short tagline shown in the hero and header.',
      initialValue: 'Crazy Good Italian. Made Fresh. No Compromises.',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      description: 'Short line shown at the top of the footer.',
      initialValue: 'Crazy good Italian cuisine. Made fresh. No compromises.',
    }),
    defineField({
      name: 'footerAbout',
      title: 'Footer About Text',
      type: 'text',
      rows: 3,
      description: 'Short brand description shown next to the logo in the footer.',
      initialValue: 'Real ingredients. Real recipes. Brought straight from Italy — and growing across Middle Tennessee.',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright line at the very bottom of every page.',
      initialValue: '2025 PennePazze. All rights reserved. Crazy Good Italian Cuisine.',
    }),
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', description: 'Full URL e.g. https://instagram.com/pennepazzeofficial' }),
        defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string', description: 'e.g. @pennepazzeofficial', initialValue: '@pennepazzeofficial' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', description: 'Full URL e.g. https://facebook.com/pennepazze' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url', description: 'Full URL e.g. https://tiktok.com/@pennepazze' }),
        defineField({ name: 'tiktokHandle', title: 'TikTok Handle', type: 'string', description: 'e.g. @pennepazze', initialValue: '@pennepazze' }),
      ],
    }),
    defineField({
      name: 'pressEmail',
      title: 'Press / Media Contact Email',
      type: 'string',
      description: 'Email address shown on the Press page for media inquiries.',
      initialValue: 'Shirnach@gmail.com',
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      description: 'Text for the email signup section in the footer.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Stay in the Loop' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2, initialValue: 'New locations, seasonal specials, and behind-the-scenes stories — straight to your inbox. No spam, just pasta.' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Defaults',
      type: 'object',
      description: 'Default meta tags used when a page does not have its own SEO settings.',
      fields: [
        defineField({ name: 'title', title: 'Default Meta Title', type: 'string', initialValue: 'PennePazze — Crazy Good Italian | Nashville & Murfreesboro' }),
        defineField({ name: 'description', title: 'Default Meta Description', type: 'text', rows: 2, initialValue: 'Authentic Italian made fresh daily. Handmade pasta, house-crafted sauces, never any seed oils. Fast casual dining in Nashville and Murfreesboro.' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
