import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

export function resolveImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityImage: any,
  fallback: string,
  width?: number,
  height?: number,
): string {
  if (sanityImage && typeof sanityImage === 'object' && '_type' in (sanityImage as object)) {
    const ref = (sanityImage as { asset?: { _ref?: string } }).asset?._ref
    if (ref) {
      let img = urlFor(sanityImage).auto('format')
      if (width) img = img.width(width)
      if (height) img = img.height(height)
      return img.url()
    }
  }
  return fallback
}
