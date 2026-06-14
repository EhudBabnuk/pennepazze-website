import { defineField, defineType } from 'sanity'

export const cateringPage = defineType({
  name: 'cateringPage',
  title: 'Catering Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'offerings', title: 'What We Offer' },
    { name: 'contact', title: 'Contact & Form' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Catering & Private Events | PennePazze Italian Catering Nashville' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Fresh Italian catering for corporate events, weddings, and private gatherings in Nashville and Middle Tennessee. Handmade pasta and chef-crafted dishes, made fresh for your event.' }),
      ],
    }),

    // Hero
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'Catering & Events' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero', initialValue: "We love being part of your special moments." }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 4, group: 'hero', initialValue: "Fresh, Authentic Italian Food Your Guests Won't Forget.\n\nFrom weddings to private dinners to corporate lunches — we bring the PennePazze experience to you. Fresh ingredients, house-made dishes, and the kind of food that makes people stop mid-conversation to ask what they just ate.\n\nWe handle all the food. You take all the credit." }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    // What We Offer
    defineField({
      name: 'offeringsSection',
      title: '"What We Can Do For You" Section',
      type: 'object',
      group: 'offerings',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: "What We Can Do For You" }),
        defineField({
          name: 'offerings',
          title: 'Offering Cards',
          type: 'array',
          of: [{
            type: 'object',
            name: 'offering',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Description', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'title' } },
          }],
        }),
      ],
    }),

    // Contact & Form
    defineField({
      name: 'formSection',
      title: 'Contact & Form Section',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: "Let's Talk" }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Have a question? Planning an event? We are here for you.' }),
        defineField({ name: 'formButtonLabel', title: 'Submit Button Label', type: 'string', initialValue: 'SUBMIT CATERING REQUEST' }),
        defineField({ name: 'callToAction', title: '"Or call us directly" Text', type: 'string', initialValue: 'Or call us directly:' }),
        defineField({ name: 'phoneNashville', title: 'Nashville Phone', type: 'string', description: 'Shown as a click-to-call link.' }),
        defineField({ name: 'phoneMurfreesboro', title: 'Murfreesboro Phone', type: 'string', description: 'Shown as a click-to-call link.' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Catering Page' }) },
})
