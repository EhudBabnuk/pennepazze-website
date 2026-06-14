import { defineField, defineType } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      description: 'Full name shown on the website, e.g. "Nashville — L&L Market"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the URL, e.g. "nashville-ll" → /locations/nashville-ll. Click Generate.',
      options: { source: 'name', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Current status of this location.',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Opening Soon', value: 'opening-soon' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'open',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood / Market Name',
      type: 'string',
      description: 'Short descriptor shown as a sub-label, e.g. "L&L Market · Charlotte Ave"',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'TN',
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      description: 'Full street address, e.g. "3826 Charlotte Ave, Nashville, TN 37209"',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Displayed to visitors and used for tel: links.',
    }),
    defineField({
      name: 'hours',
      title: 'Hours of Operation',
      type: 'object',
      description: 'Opening hours for this location.',
      fields: [
        defineField({ name: 'weekdays', title: 'Weekday Hours', type: 'string', description: 'e.g. "Tue–Sun 11am – 9:30pm"' }),
        defineField({ name: 'weekend', title: 'Weekend Hours (if different)', type: 'string', description: 'Leave blank if same as weekdays.' }),
        defineField({ name: 'notes', title: 'Hours Notes', type: 'string', description: 'e.g. "Happy Hour Mon–Fri 2–5 PM" or "Closed Mondays"' }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Location Description',
      type: 'text',
      rows: 4,
      description: 'A short paragraph describing this location — shown on the location detail page.',
    }),
    defineField({
      name: 'tagline',
      title: 'Location Tagline',
      type: 'string',
      description: 'One evocative line shown under the location name, e.g. "Where it all started."',
    }),
    defineField({
      name: 'features',
      title: 'Features / Services',
      type: 'array',
      description: 'e.g. Dine-in, Pickup, Delivery, Happy Hour, Outdoor Patio, Dog Friendly',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'orderLink',
      title: 'Online Order Link',
      type: 'url',
      description: 'URL for the "Order Online" button for this location.',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Full Google Maps URL for this address.',
    }),
    defineField({
      name: 'image',
      title: 'Location Photo',
      type: 'image',
      description: 'Main photo for this location.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Location',
      type: 'boolean',
      description: 'Show this location prominently on the homepage and locations list.',
      initialValue: true,
    }),
    defineField({
      name: 'hasEmailSignup',
      title: 'Show Email Sign-Up Form',
      type: 'boolean',
      description: 'Turn on for "Opening Soon" locations to capture emails.',
      initialValue: false,
    }),
    defineField({
      name: 'openingNote',
      title: 'Opening Note',
      type: 'text',
      rows: 3,
      description: 'Text shown on coming-soon pages, e.g. "Opening end of 2025."',
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
    select: { title: 'name', subtitle: 'status', media: 'image' },
    prepare({ title, subtitle, media }) {
      const statusLabel: Record<string, string> = { open: '🟢 Open', 'opening-soon': '🟡 Opening Soon', 'coming-soon': '⚪ Coming Soon' }
      return { title, subtitle: statusLabel[subtitle] ?? subtitle, media }
    },
  },
})
