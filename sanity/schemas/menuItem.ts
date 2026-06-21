import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Dish Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Dish Description',
      type: 'text',
      rows: 2,
      description: 'Short description shown on the menu card.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "$18" or "$18–$24"',
    }),
    defineField({
      name: 'popular',
      title: 'Mark as Popular',
      type: 'boolean',
      description: 'Show a "Popular" badge on this dish.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      description: 'Which menu category does this dish belong to?',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Dish Photo',
      type: 'image',
      description: 'Optional photo for this dish.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens / Dietary Notes',
      type: 'array',
      description: 'e.g. Gluten, Dairy, Nuts, Vegan, Vegetarian',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first within the category.',
      initialValue: 99,
    }),
    defineField({
      name: 'locations',
      title: 'Available At',
      type: 'array',
      description: 'Which locations serve this item. Leave empty to show at all locations.',
      of: [{ type: 'reference', to: [{ type: 'location' }] }],
    }),
    defineField({
      name: 'isHidden',
      title: 'Hide This Item',
      type: 'boolean',
      description: 'Temporarily hide this item from the menu without deleting it.',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
  },
})
