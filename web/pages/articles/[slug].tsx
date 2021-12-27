import { Author, Post } from 'codegen/schema'
import { Layout } from 'Components/layout'
import { postQuery } from 'lib/queries'
import { PortableText, urlForImage, usePreviewSubscription } from 'lib/sanity'
import { getClient } from 'lib/sanity.server'
import { GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'
import React from 'react'

const AuthorDetails = (props: { author?: Author }) => {
  const { author } = props

  if (!author) return null

  return (
    <>
      <p>Author:</p>
      <div>{author?.name}</div>
      {author?.image && (
        <Image
          src={
            urlForImage(author.image)
              .height(100)
              .width(100)
              .fit('crop')
              .url() || ''
          }
          width={100}
          height={100}
          // layout="fill"
          alt={`Photo of the author ${author?.name}`}
          title={`Photo of the author ${author?.name}`}
        />
      )}

      <div>Name: {author?.name || 'not_found'}</div>
      <div>Title: {author?.title || 'not_found'}</div>
      <div>Company: {author?.company || 'not_found'}</div>
      <div>Bio: {<PortableText blocks={author?.bio} /> || 'not_found'}</div>
      <div>Email: {author?.email || 'not_found'}</div>
      <div>Facebook: {author?.facebook || 'not_found'}</div>
      <div>Twitter: {author?.twitter || 'not_found'}</div>
      <div>Github: {author?.gitHub || 'not_found'}</div>
    </>
  )
}

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data: Post | Post[], preview: boolean): Post {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

/**
 * Makes Next.js aware of all the slugs it can expect at this route
 *
 * See how we've mapped over our found slugs to add a `/` character?
 * Idea: Add these in Sanity and enforce them with validation rules :)
 * https://www.simeongriggs.dev/nextjs-sanity-slug-patterns
 */
export async function getStaticPaths() {
  const allSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`
  const pages = await getClient().fetch<string[]>(allSlugsQuery)

  return {
    // paths: pages.map((slug: string) => `/articles/${slug}`),
    paths: pages.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

/**
 * Fetch the data from Sanity based on the current slug
 *
 * Important: You _could_ query for just one document, like this:
 * *[slug.current == $slug][0]
 * But that won't return a draft document!
 * And you get a better editing experience
 * fetching draft/preview content server-side
 *
 * Also: Ignore the `preview = false` param!
 * It's set by Next.js "Preview Mode"
 * It does not need to be set or changed here
 */
export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const query = groq`${postQuery}`
  const queryParams = { slug: params?.slug }
  const data = await getClient(preview).fetch(postQuery, queryParams)

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { page, query, queryParams },
    },
  }
}

interface PageProps {
  preview?: boolean
  data?: {
    page: Post
    query: string
    queryParams: {
      slug: string | string[] | undefined
    }
  }
}

/**
 * The `usePreviewSubscription` takes care of updating
 * the preview content on the client-side
 */
export default function Page({ data, preview }: PageProps) {
  const { asPath, isFallback } = useRouter()

  // cast it to unknown first to assign "string" because Post is returning wrote type {_type: "slug", current: string}
  const slug = data?.page?.slug as unknown as string

  const { data: previewData } = usePreviewSubscription(data?.query!, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: !!preview && !!slug,
  })

  // Client-side uses the same query, so we may need to filter it down again
  const page: Post = filterDataToSingleItem(previewData, !!preview)

  if (!isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout
      seoProps={{
        title: page?.title || '',
        description: page?.metaDescription || '',
      }}
    >
      {!isFallback && (
        <div>
          {preview && (
            // use html <a> tag if the following Link throws error
            <Link href={`/api/exit-preview?slug=${asPath}`}>
              Preview Mode Activated!
            </Link>
          )}

          {/* // TODO: connect cover image from next.js-examples-cms-sanity repo on the other other computer , may that will look good as a thumbnail for the embedded links of this page on another website?*/}

          {page?.title && <h1>{page?.title}</h1>}

          {page?.heroImage && (
            <Image
              src={
                urlForImage(page.heroImage)
                  .height(225)
                  .width(400)
                  .fit('crop')
                  .url() || ''
              }
              width={400}
              height={225}
              // layout="fill"
              alt={page?.heroImageAltText}
              title={page?.heroImageAltText}
            />
          )}

          {page?.body && <PortableText blocks={page?.body} />}

          <hr />

          {page?.tags?.map(({ label, value }) => (
            <button key={value}>{label}</button>
          ))}
          <hr />

          <AuthorDetails author={page?.author as Author | undefined} />
        </div>
      )}
    </Layout>
  )
}
