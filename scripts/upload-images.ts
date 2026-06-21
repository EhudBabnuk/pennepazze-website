/**
 * Image upload script — uploads selected photos from /images/ to Sanity and patches documents.
 *
 * Run: npx tsx scripts/upload-images.ts
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const IMAGES_DIR = path.resolve('/Users/who/v0-pizza-penne-site-main/images')

async function uploadImage(relativePath: string): Promise<string> {
  const fullPath = path.join(IMAGES_DIR, relativePath)
  if (!fs.existsSync(fullPath)) throw new Error(`File not found: ${fullPath}`)
  const stream = fs.createReadStream(fullPath)
  const filename = path.basename(fullPath)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

async function patchDoc(docId: string, fields: Record<string, unknown>) {
  await client.patch(docId).set(fields).commit()
  console.log(`  ✓  patched ${docId}`)
}

async function patchSingleton(type: string, fields: Record<string, unknown>) {
  const doc = await client.fetch(`*[_type == $type][0]{ _id }`, { type })
  if (!doc?._id) { console.error(`  ✗  no ${type} document found`); return }
  await patchDoc(doc._id, fields)
}

async function main() {
  console.log('\n▸ Uploading images to Sanity…\n')

  // ── About page: belief tile images ──────────────────────────────────────
  console.log('About Page — Belief Tiles')
  const qualityAsset    = await uploadImage('JUNE 2024/BU5A8346.jpg')
  const passionAsset    = await uploadImage('JUNE 2024/BU5A8340.jpg')
  const traditionAsset  = await uploadImage('April 9 2026/CCS20325.jpg')
  const storyAsset      = await uploadImage('APRIL 2024/BU5A1583.jpg')

  await patchSingleton('aboutPage', {
    'beliefsSection.qualityImage':   imageRef(qualityAsset),
    'beliefsSection.passionImage':   imageRef(passionAsset),
    'beliefsSection.traditionImage': imageRef(traditionAsset),
    'originStory.image':             imageRef(storyAsset),
  })

  // ── Careers page: team tile images ──────────────────────────────────────
  console.log('\nCareers Page — Team Tiles')
  const kitchenAsset  = await uploadImage('mar 4 2026/_DSC5443.jpg')
  const serviceAsset  = await uploadImage('APRIL 2024/BU5A1616.jpg')
  const deliveryAsset = await uploadImage('March 13 New Boxes_Merch/IMG_8200.jpg')

  await patchSingleton('careersPage', {
    kitchenTeamImage: imageRef(kitchenAsset),
    serviceTeamImage: imageRef(serviceAsset),
    deliveryTeamImage: imageRef(deliveryAsset),
  })

  // ── Location images ──────────────────────────────────────────────────────
  console.log('\nLocation Images')
  const llAsset          = await uploadImage('October 30 2025/_DSC7399.jpg')
  const germantownAsset  = await uploadImage('june 4 2026/DSC02761.jpg')
  const murfreesboroAsset = await uploadImage('June 11 2025/IMG_5157.jpg')

  await patchDoc('location-nashville-ll',         { image: imageRef(llAsset) })
  await patchDoc('location-nashville-germantown',  { image: imageRef(germantownAsset) })
  await patchDoc('location-murfreesboro',          { image: imageRef(murfreesboroAsset) })
  // Franklin has no suitable image yet — leaving empty

  // ── Updates carousel slides ──────────────────────────────────────────────
  console.log('\nUpdates Carousel Slides')
  const germantownSlideAsset = await uploadImage('April 9 2026/CCS20462.jpg')
  const gelatoSlideAsset     = await uploadImage('june 4 2026/DSC02653.jpg')
  const awardSlideAsset      = await uploadImage('MARCH 2024/BU5A9265.jpg')

  await patchDoc('slide-germantown', { image: imageRef(germantownSlideAsset) })
  await patchDoc('slide-gelato',     { image: imageRef(gelatoSlideAsset) })
  await patchDoc('slide-award',      { image: imageRef(awardSlideAsset) })

  // ── Gelato Pazzo page: schema-only fields (not rendered yet) ─────────────
  console.log('\nGelato Pazzo Page — CMS-only images')
  const gelatoNeonAsset    = await uploadImage('June 11 2026/CCS20002.jpg')
  const gelatoCupAsset     = await uploadImage('june 4 2026/DSC02653.jpg')

  await patchSingleton('gelatoPage', {
    'openNowSection.showcaseImage':    imageRef(gelatoNeonAsset),
    'differentiators.showcaseImage':   imageRef(gelatoCupAsset),
  })

  // ── Catering page: schema-only field (not rendered yet) ──────────────────
  console.log('\nCatering Page — CMS-only image')
  const cateringContentAsset = await uploadImage('September 10 2025/IMG_5489.jpg')

  await patchSingleton('cateringPage', {
    'offeringsSection.contentImage': imageRef(cateringContentAsset),
  })

  // ── Press page: schema-only field (not rendered yet) ────────────────────
  console.log('\nPress Page — CMS-only image')
  const pressFeaturedAsset = await uploadImage('MARCH 2024/BU5A9270.jpg')

  await patchSingleton('pressPage', {
    featuredImage: imageRef(pressFeaturedAsset),
  })

  // ── Homepage: offering tile images + story teaser ───────────────────────
  console.log('\nHome Page — Offering Tiles + Story Teaser')
  const menuTileAsset    = await uploadImage('MARCH 2024/BU5A9618.jpg')
  const cateringTileAsset = await uploadImage('September 10 2025/IMG_5540.jpg')
  const aboutTileAsset   = await uploadImage('june 16 2026/_DSC3281.jpg')
  const storyTeaserAsset = await uploadImage('mar 4 2026/_DSC5454.jpg')

  await patchSingleton('homePage', {
    menuTileImage:    imageRef(menuTileAsset),
    cateringTileImage: imageRef(cateringTileAsset),
    aboutTileImage:   imageRef(aboutTileAsset),
    'storyTeaser.image': imageRef(storyTeaserAsset),
  })

  // ── Menu category images ─────────────────────────────────────────────────
  console.log('\nMenu Categories — Category Images')
  const sigPastaImgAsset   = await uploadImage('MARCH 2024/BU5A9618.jpg')
  const sigPinsaImgAsset   = await uploadImage('September 10 2025/IMG_5510.jpg')
  const saladsImgAsset     = await uploadImage('MARCH 2024/BU5A9314.jpg')
  const paniniImgAsset     = await uploadImage('September 10 2025/IMG_5534.jpg')
  const kidsImgAsset       = await uploadImage('September 10 2025/IMG_5502.jpg')
  const beveragesImgAsset  = await uploadImage('MARCH 2024/BU5A9620.jpg')
  const dessertsImgAsset   = await uploadImage('june 16 2026/_DSC3310.jpg')
  const italianKitchenAsset = await uploadImage('june 16 2026/_DSC3277.jpg')

  await patchDoc('cat-signature-pasta',  { image: imageRef(sigPastaImgAsset) })
  await patchDoc('cat-signature-pinsa',  { image: imageRef(sigPinsaImgAsset) })
  await patchDoc('cat-fresh-salads',     { image: imageRef(saladsImgAsset) })
  await patchDoc('cat-panini',           { image: imageRef(paniniImgAsset) })
  await patchDoc('cat-kids-meal',        { image: imageRef(kidsImgAsset) })
  await patchDoc('cat-beverages',        { image: imageRef(beveragesImgAsset) })
  await patchDoc('cat-desserts',         { image: imageRef(dessertsImgAsset) })
  await patchDoc('cat-italian-kitchen',  { image: imageRef(italianKitchenAsset) })

  console.log('\n✅  Done. All images uploaded and documents patched.\n')
}

main().catch((err) => {
  console.error('Upload failed:', err)
  process.exit(1)
})
