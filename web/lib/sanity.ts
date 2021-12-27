import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from 'next-sanity'

import { sanityConfig } from './config'

export const imageBuilder = createImageUrlBuilder(sanityConfig)

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max')

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
})
