/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from 'next-sanity'
import { SanityDocument } from 'sanity-codegen'

import { sanityConfig } from './config'

export type SanityClient = ReturnType<typeof createClient>

export const sanityClient = createClient(sanityConfig)

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview?: boolean) =>
  preview ? previewClient : sanityClient

export const getWriteClient = () =>
  createClient({
    ...sanityConfig,
    // Need a write token in order to read schedule metadata and publish documents
    token: process.env.SANITY_API_TOKEN_WRITE,
    useCdn: false,
  })

export function overlayDrafts(docs: SanityDocument[]) {
  const documents = docs || []

  const overlayed = documents.reduce(
    (map: Map<string, SanityDocument>, doc: SanityDocument) => {
      if (!doc._id) {
        throw new Error('Ensure that `_id` is included in query projection')
      }

      const isDraft = doc._id.startsWith('drafts.')
      const id = isDraft ? doc._id.slice(7) : doc._id
      return isDraft || !map.has(id) ? map.set(id, doc) : map
    },
    new Map()
  )

  return Array.from(overlayed.values())
}
