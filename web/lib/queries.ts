const authorFields = `
  _id,
  name,
  title,
  company,
  image,
  bio,
  email,
  facebook,
  twitter,
  gitHub,
`

const postFields = `
  _id,
  title,
  metaDescription,
  body,
  publishedAt,
  heroImage,
  heroImageAltText,
  tags,
  author,
  "slug": slug.current,
  "author": author->{${authorFields}},
`

export const indexQuery = `
  *[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
  *[_type == "post" && slug.current == $slug] {
    ${postFields}
  }
`
