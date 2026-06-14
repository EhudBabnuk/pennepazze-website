import { defineField, defineType } from 'sanity'

// Retained for backwards compatibility with existing queries.
// New catering offerings are managed via cateringPage.offeringsSection.
export const cateringBenefit = defineType({
  name: 'cateringBenefit',
  title: 'Catering — Offering Card',
  type: 'document',
  description: 'Individual catering offering cards shown in the "What We Can Do For You" section.',
  fields: [
    defineField({ name: 'title', title: 'Card Title', type: 'string', description: 'e.g. "Corporate Catering"', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Card Description', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name for this card.',
      options: {
        list: [
          { title: 'Briefcase (Corporate)', value: 'Briefcase' },
          { title: 'Party Popper (Events)', value: 'PartyPopper' },
          { title: 'Heart (Weddings)', value: 'Heart' },
          { title: 'Users (Large Groups)', value: 'Users' },
          { title: 'Chef Hat', value: 'ChefHat' },
          { title: 'Truck (Delivery)', value: 'Truck' },
        ],
      },
    }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'icon' } },
})
