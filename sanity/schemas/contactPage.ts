import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'form', title: 'Contact Form' },
    { name: 'social', title: 'Social Links' },
    { name: 'order', title: 'Order Buttons' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Contact PennePazze | Nashville, Murfreesboro, Germantown and Franklin' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Contact PennePazze for general inquiries, catering requests, or just to say hello. Four locations across Middle Tennessee.' }),
      ],
    }),

    defineField({ name: 'heroHeading', title: 'Page Heading', type: 'string', group: 'hero', initialValue: "Let's Talk" }),
    defineField({ name: 'heroSubheading', title: 'Page Subheading', type: 'string', group: 'hero', initialValue: 'Have a question? Planning an event? We are here for you.' }),

    defineField({
      name: 'formSection',
      title: 'Contact Form Section',
      type: 'object',
      group: 'form',
      fields: [
        defineField({ name: 'heading', title: 'Form Heading', type: 'string', initialValue: 'Send Us a Message' }),
        defineField({ name: 'buttonLabel', title: 'Submit Button Label', type: 'string', initialValue: 'Send Message' }),
      ],
    }),

    defineField({
      name: 'followUs',
      title: 'Follow Us Section',
      type: 'object',
      group: 'social',
      description: 'Handles shown under the contact form. Full URLs are managed in Site Settings.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Follow Us' }),
      ],
    }),

    defineField({
      name: 'orderButtons',
      title: 'Order Buttons',
      type: 'object',
      group: 'order',
      description: 'Two "Order Now" buttons shown on the Contact page.',
      fields: [
        defineField({ name: 'nashvilleLabel', title: 'Nashville Button Label', type: 'string', initialValue: 'ORDER NASHVILLE' }),
        defineField({ name: 'nashvilleUrl', title: 'Nashville Order URL', type: 'url', description: 'Online order link for Nashville location.' }),
        defineField({ name: 'murfreesboroLabel', title: 'Murfreesboro Button Label', type: 'string', initialValue: 'ORDER MURFREESBORO' }),
        defineField({ name: 'murfreesboroUrl', title: 'Murfreesboro Order URL', type: 'url', description: 'Online order link for Murfreesboro location.' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
