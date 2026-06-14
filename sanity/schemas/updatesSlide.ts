import { defineField, defineType } from 'sanity'

export const updatesSlide = defineType({
  name: 'updatesSlide',
  title: 'News & Updates (Carousel)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Badge Label',
      type: 'string',
      description: 'Short badge shown above the title, e.g. "NEW", "AWARD", "COMING SOON"',
    }),
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      description: 'Main headline for this slide.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Slide Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences providing detail.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Label',
      type: 'string',
      description: 'e.g. "Learn More →"',
      initialValue: 'Learn More →',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button URL',
      type: 'string',
      description: 'Where the button links to. Can be a page path like /about or a full URL.',
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first in the carousel.',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'label', media: 'image' },
  },
})
