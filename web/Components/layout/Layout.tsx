import { Loader } from 'Components/loader/Loader'
import { Seo } from 'Components/seo'
import { SeoProps } from 'Components/seo/Seo'
import { SITE_METADATA } from 'Constants/site'
import Link from 'next/link'
import styles from 'Styles/Layout.module.css'

export const Layout = ({
  children,
  signOut,
  email,
  authLoading = false,
  seoProps = {
    title: SITE_METADATA.defaultTitle,
    description: SITE_METADATA.defaultDescription,
  },
}: {
  children: React.ReactNode
  signOut?: () => void
  email?: string | null
  authLoading?: boolean
  seoProps?: SeoProps
}) => {
  return (
    <>
      <Seo {...seoProps} />

      <div>
        <ul className={styles.links}>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/authenticated">authenticated</Link>
          </li>
          <li>
            <Link href="/un-authenticated">un-authenticated</Link>
          </li>
          <li>
            <Link href="/articles">articles</Link>
          </li>

          <li>
            {email ? (
              <button onClick={signOut}>
                <Loader loading={authLoading}>Logout</Loader>
              </button>
            ) : (
              <Link href="/login" passHref>
                <button>
                  <Loader loading={authLoading}>
                    You&apos;re not logged in. Go to login page
                  </Loader>
                </button>
              </Link>
            )}
          </li>
        </ul>

        <hr />

        <div>{children}</div>
      </div>
    </>
  )
}
