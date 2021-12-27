import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen'

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: 'author'

  /**
   * Name — `string`
   *
   *
   */
  name?: string

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Company — `string`
   *
   *
   */
  company?: string

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>

  /**
   * Email — `string`
   *
   *
   */
  email?: string

  /**
   * Facebook — `string`
   *
   *
   */
  facebook?: string

  /**
   * Twitter — `string`
   *
   *
   */
  twitter?: string

  /**
   * GitHub — `string`
   *
   *
   */
  gitHub?: string
}

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: 'post'

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string

  /**
   * Hero image — `image`
   *
   *
   */
  heroImage?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }

  /**
   * Hero image alt text — `string`
   *
   *
   */
  heroImageAltText?: string

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<
    SanityKeyed<{
      /**
       * Label — `string`
       *
       *
       */
      label?: string

      /**
       * Value — `string`
       *
       *
       */
      value?: string
    }>
  >

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
      crop?: SanityImageCrop
      hotspot?: SanityImageHotspot
    }>
>

export type Documents = Author | Post
