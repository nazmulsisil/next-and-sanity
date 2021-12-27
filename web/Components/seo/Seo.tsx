import { SITE_METADATA } from 'Constants/site'
import { urlForImage } from 'lib/sanity'
import Head from 'next/head'
import React from 'react'
import { SanityImage } from 'sanity-codegen'

export interface SeoProps {
  description: string
  title: string
  thumbnail?: SanityImage
  meta?: { name: string; content: string }[]
}

export const Seo = ({
  description = '',
  meta = [],
  title,
  thumbnail,
}: SeoProps) => {
  const { defaultTitle, defaultDescription, author, siteUrl } = SITE_METADATA

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: siteUrl,
  }

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebApplication',
    url: siteUrl,
    headline: seo.title,
    inLanguage: 'EN',
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      '@type': 'Organization',
      name: author,
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: author,
    },
    copyrightYear: new Date().getFullYear(),
    creator: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: author,
    },
    datePublished: '2019-01-01T10:00:00.000Z',
    dateModified: new Date().toISOString(),
    image: {
      '@type': 'ImageObject',
      url: '',
    },
  }

  const seoMeta = [
    {
      name: 'description',
      content: seo.description,
    },
    {
      property: 'og:title',
      content: seo.title,
    },
    {
      property: 'og:description',
      content: seo.description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    ...(thumbnail
      ? [
          {
            key: 'ogImage',
            property: 'og:image',
            content: urlForImage(thumbnail)
              .width(1200)
              .height(627)
              .fit('crop')
              .url()!,
          },
        ]
      : []),
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: author,
    },
    {
      name: 'twitter:title',
      content: seo.title,
    },
    {
      name: 'twitter:description',
      content: seo.description,
    },
  ].concat(meta)

  return (
    <Head>
      {seo.title && <title>{seo.title}</title>}
      {seoMeta.map(({ name, property, content, key }) => {
        const nameOrProperty = name || property
        return (
          <meta
            key={key || nameOrProperty}
            name={nameOrProperty}
            content={content}
          />
        )
      })}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Head>
  )
}
