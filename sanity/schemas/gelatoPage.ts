import { defineField, defineType } from 'sanity'

export const gelatoPage = defineType({
  name: 'gelatoPage',
  title: 'Gelato Pazzo Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'differentiators', title: 'What Makes It Different' },
    { name: 'openNow', title: 'Open Now Section' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Gelato Pazzo | Fresh Italian Gelato — by PennePazze' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Introducing Gelato Pazzo — fresh, handmade Italian gelato from the team behind PennePazze. Same obsession with clean ingredients. Made in-house daily. Just colder.' }),
      ],
    }),

    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'Gelato Pazzo' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero', initialValue: 'Crazy Good Italian Gelato.' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 4, group: 'hero', initialValue: 'From the team behind PennePazze comes something new — and something you are going to love.\n\nGelato Pazzo is our take on authentic Italian gelato, made fresh in-house every day from real, clean ingredients. No artificial flavors. No seed oils. No mystery ingredients. Just pure, intensely flavored gelato crafted the Italian way.\n\nSame PennePazze obsession. Same zero compromises.' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    defineField({
      name: 'differentiators',
      title: '"What Makes It Different" Section',
      type: 'object',
      group: 'differentiators',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'What Makes It Different' }),
        defineField({ name: 'showcaseImage', title: 'Section Showcase Image', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{
            type: 'object',
            name: 'differentiator',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Description', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'title' } },
          }],
        }),
      ],
    }),

    defineField({
      name: 'openNowSection',
      title: '"Now Open" Section',
      type: 'object',
      group: 'openNow',
      description: 'Update this when Gelato Pazzo opens.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Now Open' }),
        defineField({ name: 'showcaseImage', title: 'Showcase Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'address', title: 'Address', type: 'string', description: '[To be confirmed once location is set]' }),
        defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'VISIT GELATO PAZZO' }),
        defineField({ name: 'externalUrl', title: 'External Website URL', type: 'url', description: 'Link to gelatopazzo.com once the site is live.' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Gelato Pazzo Page' }) },
})
