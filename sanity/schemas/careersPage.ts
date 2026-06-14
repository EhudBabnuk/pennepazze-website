import { defineField, defineType } from 'sanity'

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Introduction' },
    { name: 'benefits', title: 'Why Work Here' },
    { name: 'roles', title: 'Open Positions' },
    { name: 'form', title: 'Application Form' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Careers at PennePazze | Join Our Team in Nashville and Murfreesboro' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2, initialValue: 'Join the PennePazze family. We are growing fast and looking for passionate, hardworking people for our Nashville, Murfreesboro, Germantown, and Franklin locations.' }),
      ],
    }),

    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'Come Work With Us' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero', initialValue: 'We are growing — and we are looking for people who love food, people, and doing things right.' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    defineField({
      name: 'introSection',
      title: 'Introduction',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Join the PennePazze Family' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, initialValue: "PennePazze is not just a job. It is a place where the team actually cares — about the food, the guests, and each other.\n\nWith four locations across Middle Tennessee and more on the way, we have real opportunities for front-of-house, back-of-house, and management roles." }),
      ],
    }),

    defineField({
      name: 'benefitsSection',
      title: '"Why You\'ll Love Working Here" Section',
      type: 'object',
      group: 'benefits',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: "Why You'll Love Working Here" }),
        defineField({
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [{
            type: 'object',
            name: 'benefit',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Description', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'title' } },
          }],
        }),
      ],
    }),

    defineField({
      name: 'openPositionsSection',
      title: 'Open Positions Section',
      type: 'object',
      group: 'roles',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Open Positions' }),
        defineField({ name: 'defaultMessage', title: 'Default Message (when no roles listed)', type: 'text', rows: 2, initialValue: 'We are always accepting applications for front-of-house, back-of-house, and management across all locations. Great people are always welcome.' }),
      ],
    }),

    defineField({
      name: 'formSection',
      title: 'Application Form Section',
      type: 'object',
      group: 'form',
      fields: [
        defineField({ name: 'heading', title: 'Form Heading', type: 'string', initialValue: 'Apply Now' }),
        defineField({ name: 'buttonLabel', title: 'Submit Button Label', type: 'string', initialValue: 'APPLY NOW' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Careers Page' }) },
})
