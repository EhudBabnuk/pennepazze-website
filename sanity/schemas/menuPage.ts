import { defineField, defineType } from 'sanity'

export const menuPage = defineType({
  name: 'menuPage',
  title: 'Menu Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Page Header' },
    { name: 'freshness', title: 'Freshness Strip' },
    { name: 'order', title: 'Order CTA' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Menu | PennePazze — Fresh Italian Pasta and Pinsa in Nashville' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Browse the PennePazze menu — handmade fresh pasta, authentic Roman pinsa, chef-crafted sauces, and Italian desserts. No seed oils. No preservatives. Made fresh daily in Nashville and Murfreesboro.' }),
      ],
    }),

    defineField({ name: 'heroHeading', title: 'Page Heading', type: 'string', group: 'hero', initialValue: 'Real Italian. No Compromises.' }),
    defineField({ name: 'heroBody', title: 'Page Sub-text', type: 'text', rows: 2, group: 'hero', initialValue: 'From creamy carbonara to rich ragu and fresh pinsa — every dish is built on flavor, quality, and tradition.' }),

    defineField({
      name: 'freshnessStrip',
      title: 'Freshness Badges',
      type: 'array',
      group: 'freshness',
      description: 'Short badges shown in a horizontal row. e.g. "Fresh pasta rolled daily"',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'orderSection',
      title: 'Order CTA Section',
      type: 'object',
      group: 'order',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Ready to Order?' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, initialValue: 'Scan the QR code at your table to browse our full menu with photos and descriptions. Ordering online or for pickup? Use the button below.' }),
        defineField({ name: 'orderButtonLabel', title: 'Order Button Label', type: 'string', initialValue: 'ORDER ONLINE' }),
        defineField({ name: 'specialDietsLinkText', title: '"Special Diets" Link Text', type: 'string', initialValue: 'View Special Diets Menu →' }),
        defineField({ name: 'specialDietsUrl', title: 'Special Diets Menu URL', type: 'url' }),
        defineField({ name: 'pdfLinkText', title: 'PDF Link Text', type: 'string', initialValue: 'Download Printable Menu (PDF) →' }),
        defineField({ name: 'pdfUrl', title: 'Printable Menu PDF URL', type: 'url' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Menu Page' }) },
})
