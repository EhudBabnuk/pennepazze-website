import { defineField, defineType } from 'sanity'

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Award Source / Publication',
      type: 'string',
      description: 'e.g. "Nashville Scene — Best Italian Restaurant"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Year the award was given.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ranking',
      title: 'Ranking / Title',
      type: 'string',
      description: 'e.g. "#2 Best Italian in Nashville, 2025"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences of context shown below the badge.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Image',
      type: 'image',
      description: 'Upload the award badge graphic if you have one.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Show this award in the awards strip on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first (most recent first recommended).',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'ranking', subtitle: 'source', media: 'badge' },
  },
})
