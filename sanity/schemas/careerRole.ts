import { defineField, defineType } from 'sanity'

export const careerRole = defineType({
  name: 'careerRole',
  title: 'Career Role',
  type: 'document',
  description: 'Add and update open job positions here. These appear on the Careers page.',
  fields: [
    defineField({
      name: 'roleTitle',
      title: 'Job Title',
      type: 'string',
      description: 'e.g. "Line Cook", "Server", "Assistant Manager"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Kitchen', value: 'Kitchen' },
          { title: 'Front of House / Service', value: 'Service' },
          { title: 'Delivery', value: 'Delivery' },
          { title: 'Management', value: 'Management' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      description: 'Which location is this role at? Leave blank for "All Locations".',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Full-time or Part-time', value: 'Full-time or Part-time' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'applyLink',
      title: 'Apply Link',
      type: 'url',
      description: 'Optional link to an external job posting (e.g. Indeed, LinkedIn).',
    }),
    defineField({
      name: 'active',
      title: 'Currently Hiring',
      type: 'boolean',
      description: 'Uncheck to hide this role without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [{ title: 'Department', name: 'department', by: [{ field: 'department', direction: 'asc' }, { field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'roleTitle', subtitle: 'department', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: `${subtitle}${active === false ? ' — INACTIVE' : ''}` }
    },
  },
})
