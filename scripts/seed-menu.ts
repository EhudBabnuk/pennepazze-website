/**
 * Menu migration script — imports PennePazze menu from pennepazze.net/menu/
 * into the live Sanity dataset.
 *
 * Source of truth: pennepazze.net/menu/ (scraped 2026-06-21)
 *
 * Run: npx tsx scripts/seed-menu.ts
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function upsert(doc: Record<string, unknown>) {
  try {
    await client.createOrReplace(doc as never)
    console.log(`  ✓  ${doc._type} → ${String(doc._id)}`)
  } catch (err) {
    console.error(`  ✗  ${doc._type} → ${String(doc._id)}:`, (err as Error).message)
  }
}

async function deleteIfExists(id: string) {
  try {
    await client.delete(id)
    console.log(`  ✓  deleted stale document → ${id}`)
  } catch {
    // document didn't exist — ignore
  }
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES — exactly as they appear on pennepazze.net/menu/
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { _id: 'cat-signature-pasta',   name: 'Signature Pasta',           slug: 'signature-pasta',           displayOrder: 1 },
  { _id: 'cat-signature-pinsa',   name: 'Signature Pinsa',           slug: 'signature-pinsa',           displayOrder: 2 },
  { _id: 'cat-fresh-salads',      name: 'Fresh Salads',              slug: 'fresh-salads',              displayOrder: 3 },
  { _id: 'cat-panini',            name: 'Panini',                    slug: 'panini',                    displayOrder: 4 },
  { _id: 'cat-kids-meal',         name: 'Kids Meal',                 slug: 'kids-meal',                 displayOrder: 5 },
  { _id: 'cat-beverages',         name: 'Beverages',                 slug: 'beverages',                 displayOrder: 6 },
  { _id: 'cat-desserts',          name: 'Desserts',                  slug: 'desserts',                  displayOrder: 7 },
  { _id: 'cat-italian-kitchen',   name: 'From the Italian Kitchen',  slug: 'from-the-italian-kitchen',  displayOrder: 8 },
]

// ─────────────────────────────────────────────────────────────
// ITEMS — exactly as they appear on pennepazze.net/menu/
// No descriptions or dietary tags present on source site.
// Images left empty — owner will manage via CMS.
// locations left empty — all items available at all locations.
// ─────────────────────────────────────────────────────────────
const ITEMS: Array<{ _id: string; name: string; price: string; categoryId: string; displayOrder: number; popular: boolean }> = [
  // Signature Pasta
  { _id: 'item-amatriciana',       name: 'Amatriciana',                      price: '$18.00', categoryId: 'cat-signature-pasta', displayOrder: 1,  popular: false },
  { _id: 'item-campanelle-pazze',  name: 'Campanelle Pazze',                 price: '$18.00', categoryId: 'cat-signature-pasta', displayOrder: 2,  popular: false },
  { _id: 'item-carbonara-pazza',   name: 'Carbonara Pazza',                  price: '$19.00', categoryId: 'cat-signature-pasta', displayOrder: 3,  popular: false },
  { _id: 'item-crema-di-broccoli', name: 'Crema di Broccoli',                price: '$18.00', categoryId: 'cat-signature-pasta', displayOrder: 4,  popular: false },
  { _id: 'item-gnocchi-gorgonzola',name: 'Gnocchi Crema di Gorgonzola',      price: '$18.00', categoryId: 'cat-signature-pasta', displayOrder: 5,  popular: false },
  { _id: 'item-lasagna',           name: 'Lasagna',                          price: '$18.00', categoryId: 'cat-signature-pasta', displayOrder: 6,  popular: false },
  { _id: 'item-nonna-paula',       name: 'Nonna Paula',                      price: '$19.00', categoryId: 'cat-signature-pasta', displayOrder: 7,  popular: false },

  // Signature Pinsa
  { _id: 'item-piccantina',        name: 'Piccantina',                       price: '$20.00', categoryId: 'cat-signature-pinsa', displayOrder: 1,  popular: false },
  { _id: 'item-pinsa-funghi',      name: 'Pinsa Funghi',                     price: '$20.00', categoryId: 'cat-signature-pinsa', displayOrder: 2,  popular: false },
  { _id: 'item-pinsa-maiala',      name: 'Pinsa Maiala',                     price: '$19.00', categoryId: 'cat-signature-pinsa', displayOrder: 3,  popular: false },

  // Fresh Salads
  { _id: 'item-arugula-salad',     name: 'Arugula Salad',                    price: '$10.00', categoryId: 'cat-fresh-salads',    displayOrder: 1,  popular: false },
  { _id: 'item-beet-spinach-salad',name: 'Beet Spinach Salad',               price: '$10.00', categoryId: 'cat-fresh-salads',    displayOrder: 2,  popular: false },
  { _id: 'item-crudo-e-burrata',   name: 'Crudo E Burrata',                  price: '$15.00', categoryId: 'cat-fresh-salads',    displayOrder: 3,  popular: false },

  // Panini
  { _id: 'item-meatball-panini',   name: 'Meatball Panini',                  price: '$17.00', categoryId: 'cat-panini',          displayOrder: 1,  popular: false },
  { _id: 'item-panini-caprese',    name: 'Panini Caprese',                   price: '$15.00', categoryId: 'cat-panini',          displayOrder: 2,  popular: false },

  // Kids Meal
  { _id: 'item-pasta-butter-cheese', name: 'Pasta With Butter & Cheese',     price: '$10.00', categoryId: 'cat-kids-meal',       displayOrder: 1,  popular: false },
  { _id: 'item-pasta-tomato-cheese', name: 'Pasta With Tomato Sauce & Cheese', price: '$10.00', categoryId: 'cat-kids-meal',    displayOrder: 2,  popular: false },

  // Beverages
  { _id: 'item-beer',                    name: 'Beer',                        price: '$7.00',  categoryId: 'cat-beverages',       displayOrder: 1,  popular: false },
  { _id: 'item-bottle-of-wine',          name: 'Bottle of Wine',              price: '$30.00', categoryId: 'cat-beverages',       displayOrder: 2,  popular: false },
  { _id: 'item-cappuccino',              name: 'Cappuccino',                  price: '$5.00',  categoryId: 'cat-beverages',       displayOrder: 3,  popular: false },
  { _id: 'item-coke-cola-de-mexico',     name: 'Coke Cola de Mexico',         price: '$3.50',  categoryId: 'cat-beverages',       displayOrder: 4,  popular: false },
  { _id: 'item-espresso',                name: 'Espresso',                    price: '$3.00',  categoryId: 'cat-beverages',       displayOrder: 5,  popular: false },
  { _id: 'item-glass-of-wine',           name: 'Glass of Wine',               price: '$10.00', categoryId: 'cat-beverages',       displayOrder: 6,  popular: false },
  { _id: 'item-italian-beer',            name: 'Italian Beer',                price: '$8.00',  categoryId: 'cat-beverages',       displayOrder: 7,  popular: false },
  { _id: 'item-italian-sparkling-water', name: 'Italian Sparkling Mineral Water', price: '$4.00', categoryId: 'cat-beverages',   displayOrder: 8,  popular: false },
  { _id: 'item-lemonade',                name: 'Lemonade',                    price: '$3.50',  categoryId: 'cat-beverages',       displayOrder: 9,  popular: false },
  { _id: 'item-mineral-water',           name: 'Mineral Water',               price: '$3.00',  categoryId: 'cat-beverages',       displayOrder: 10, popular: false },
  { _id: 'item-pennepazzee-cocktail',    name: 'PennePazzee Cocktail',        price: '$10.00', categoryId: 'cat-beverages',       displayOrder: 11, popular: false },

  // Desserts
  { _id: 'item-cannoli-cones',     name: 'Cannoli Cones',                    price: '$6.00',  categoryId: 'cat-desserts',        displayOrder: 1,  popular: false },

  // From the Italian Kitchen
  { _id: 'item-pane-puffs',        name: 'Pane Puffs',                       price: '$10.00', categoryId: 'cat-italian-kitchen', displayOrder: 1,  popular: false },
]

// Old placeholder IDs created by the original seed script — safe to delete
// because no items reference them (we're creating items with new IDs here).
const STALE_CATEGORY_IDS = [
  'cat-fresh-pasta',
  'cat-pinsa',
  'cat-lasagna',
  'cat-salads',
  'cat-drinks',
]

async function run() {
  console.log('\n🍝  PennePazze Menu Migration\n')
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}\n`)

  // 1 — Delete stale placeholder categories from old seed
  console.log('▸ Removing stale placeholder categories…')
  for (const id of STALE_CATEGORY_IDS) await deleteIfExists(id)

  // 2 — Upsert real categories
  console.log('\n▸ Menu Categories (8)')
  for (const cat of CATEGORIES) {
    await upsert({
      _id: cat._id,
      _type: 'menuCategory',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      displayOrder: cat.displayOrder,
    })
  }

  // 3 — Upsert items
  console.log('\n▸ Menu Items (30)')
  for (const item of ITEMS) {
    await upsert({
      _id: item._id,
      _type: 'menuItem',
      name: item.name,
      price: item.price,
      popular: item.popular,
      isHidden: false,
      displayOrder: item.displayOrder,
      category: { _type: 'reference', _ref: item.categoryId },
    })
  }

  console.log('\n✅  Done — 8 categories, 30 items imported.\n')
}

run().catch((err) => {
  console.error('\n❌  Migration failed:', err.message)
  process.exit(1)
})
