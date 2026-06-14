import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'origin', title: 'Our Story' },
    { name: 'beliefs', title: 'What We Believe In' },
    { name: 'experience', title: 'The Experience' },
    { name: 'press', title: 'Press Quotes' },
    { name: 'cta', title: 'Call to Action' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'About PennePazze | Authentic Italian Made Fresh in Nashville' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'The story behind PennePazze — brought to Nashville by an Italian founder and a pastaio from Sicily, with equipment imported from Italy and recipes rooted in real Italian tradition.' }),
      ],
    }),

    // Hero
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: "We're a Little Crazy About Italian Food." }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero', initialValue: 'And we think that is exactly what it takes to do it right.' }),

    // Origin Story
    defineField({
      name: 'originStory',
      title: 'Origin Story Section',
      type: 'object',
      group: 'origin',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'From Our Family to Your Table.' }),
        defineField({ name: 'paragraphs', title: 'Story Paragraphs', type: 'array', of: [{ type: 'text' }], description: 'Add each paragraph as a separate item.' }),
      ],
    }),

    // What We Believe In
    defineField({
      name: 'beliefsSection',
      title: '"What We Believe In" Section',
      type: 'object',
      group: 'beliefs',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'What We Believe In' }),
        defineField({
          name: 'items',
          title: 'Belief Items (checklist)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Each item appears as a checkmark line.',
        }),
      ],
    }),

    // The Experience
    defineField({
      name: 'experienceSection',
      title: '"Fast Casual" Experience Section',
      type: 'object',
      group: 'experience',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Fast Casual — But Make It Chef.' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 5 }),
      ],
    }),

    // Press Quotes
    defineField({
      name: 'pressQuotes',
      title: 'Press Quotes',
      type: 'array',
      group: 'press',
      of: [{
        type: 'object',
        name: 'pressQuote',
        fields: [
          defineField({ name: 'quote', title: 'Quote Text', type: 'text', rows: 2 }),
          defineField({ name: 'attribution', title: 'Attribution (publication or guest)', type: 'string' }),
        ],
        preview: { select: { title: 'attribution', subtitle: 'quote' } },
      }],
    }),

    // CTA
    defineField({
      name: 'ctaSection',
      title: 'Bottom Call to Action',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Come Hungry. Leave Happy.' }),
        defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'ORDER NOW' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
