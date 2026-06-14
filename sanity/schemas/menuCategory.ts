import { defineField, defineType } from 'sanity'

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g. "Fresh Pasta", "Pinsa Romana", "Desserts"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used internally to identify the category. Click Generate.',
      options: { source: 'name', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 4,
      description: 'Short paragraph shown above the items in this category on the menu page.',
    }),
    defineField({
      name: 'highlightedItems',
      title: 'Highlighted Dishes',
      type: 'array',
      description: 'Dish names to badge as "popular" or highlight in this category.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first in the menu.',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
