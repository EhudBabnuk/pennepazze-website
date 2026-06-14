'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './sanity/schemas'

const singletonTypes = new Set([
  'siteSettings', 'homePage', 'aboutPage', 'menuPage',
  'cateringPage', 'gelatoPage', 'careersPage', 'pressPage', 'contactPage',
])

export default defineConfig({
  name: 'penne-pazze-studio',
  title: 'PennePazze CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('PennePazze Content')
          .items([
            // ── Global ────────────────────────────────────
            S.listItem().title('⚙️  Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            // ── Pages ─────────────────────────────────────
            S.listItem().title('🏠  Home Page').id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('ℹ️  About Page').id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('🍝  Menu Page').id('menuPage')
              .child(S.document().schemaType('menuPage').documentId('menuPage')),
            S.listItem().title('🎉  Catering Page').id('cateringPage')
              .child(S.document().schemaType('cateringPage').documentId('cateringPage')),
            S.listItem().title('🍦  Gelato Pazzo Page').id('gelatoPage')
              .child(S.document().schemaType('gelatoPage').documentId('gelatoPage')),
            S.listItem().title('💼  Careers Page').id('careersPage')
              .child(S.document().schemaType('careersPage').documentId('careersPage')),
            S.listItem().title('📰  Press Page').id('pressPage')
              .child(S.document().schemaType('pressPage').documentId('pressPage')),
            S.listItem().title('📬  Contact Page').id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),

            S.divider(),

            // ── Collections ───────────────────────────────
            S.documentTypeListItem('location').title('📍  Locations'),
            S.documentTypeListItem('menuCategory').title('📋  Menu Categories'),
            S.documentTypeListItem('menuItem').title('🍽️  Menu Items'),
            S.documentTypeListItem('award').title('🏆  Awards'),
            S.documentTypeListItem('pressArticle').title('📰  Press Articles'),
            S.documentTypeListItem('updatesSlide').title('📢  News & Updates (Carousel)'),
            S.documentTypeListItem('cateringBenefit').title('🎉  Catering Offerings'),
            S.documentTypeListItem('careerRole').title('💼  Career Roles'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
