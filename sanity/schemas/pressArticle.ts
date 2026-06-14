import { defineField, defineType } from 'sanity'

export const pressArticle = defineType({
  name: 'pressArticle',
  title: 'Press Article',
  type: 'document',
  fields: [
    defineField({
      name: 'publication',
      title: 'Publication Name',
      type: 'string',
      description: 'e.g. "The Infatuation", "Nashville Go"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
      description: 'The key quote shown on the press page, e.g. "Extremely on-point handmade pastas…"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'link',
      title: 'Article URL',
      type: 'url',
      description: 'Link to the original article.',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Button Text',
      type: 'string',
      description: 'e.g. "Read the Review →"',
      initialValue: 'Read More →',
    }),
    defineField({
      name: 'publicationLogo',
      title: 'Publication Logo',
      type: 'image',
      description: 'Upload the publication logo if you have it.',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Fallback Text',
      type: 'string',
      description: 'Shown if no logo image is uploaded, e.g. "THE INFATUATION"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this article prominently at the top.',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first.',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'publication', subtitle: 'pullQuote', media: 'publicationLogo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.substring(0, 80), media }
    },
  },
})
