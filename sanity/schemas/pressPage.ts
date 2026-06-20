import { defineField, defineType } from 'sanity'

export const pressPage = defineType({
  name: 'pressPage',
  title: 'Press Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'google', title: 'Google Rating' },
    { name: 'contact', title: 'Media Contact' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Press | PennePazze — Awards and Media' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'PennePazze — named Best Italian Restaurant in Nashville by Nashville Scene two years running. Featured in The Infatuation, Nashville Go, and more.' }),
      ],
    }),

    defineField({ name: 'heroHeading', title: 'Page Heading', type: 'string', group: 'hero', initialValue: 'In the Press' }),
    defineField({ name: 'heroSubheading', title: 'Page Subheading', type: 'string', group: 'hero', initialValue: 'What Nashville is saying about us.' }),
    defineField({ name: 'featuredImage', title: 'Featured Editorial Image', type: 'image', group: 'hero', options: { hotspot: true }, description: 'Optional editorial photo shown on the press page.' }),

    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'object',
      group: 'google',
      fields: [
        defineField({ name: 'rating', title: 'Rating', type: 'string', initialValue: '4.8 stars on Google' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'across thousands of reviews from Nashville and Murfreesboro guests.' }),
      ],
    }),

    defineField({
      name: 'mediaContactSection',
      title: 'Media Contact Section',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Press Inquiries' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2, initialValue: 'For press inquiries, partnership opportunities, or media requests:' }),
        defineField({ name: 'email', title: 'Contact Email', type: 'string', initialValue: 'Shirnach@gmail.com' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Press Page' }) },
})
