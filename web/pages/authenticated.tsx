import { FullPageLoader } from 'Components/FullPageLoader'
import { Layout } from 'Components/layout'
import { Loader } from 'Components/loader/Loader'
import initAuth from 'Config/firebase/auth/utils/init-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import React from 'react'

initAuth()

const Authenticated = () => {
  const router = useRouter()
  const AuthUser = useAuthUser()

  return (
    <Layout
      authLoading={!AuthUser.clientInitialized}
      email={AuthUser.email}
      signOut={AuthUser.signOut}
    >
      <div>
        <strong>Ask:</strong>
        <ul>
          <li>If a user is authenticated, only he/she should see this page</li>
          <li>
            If you hard reload the page, a full page loading spinner should
            appear without flush.
          </li>
          <li>
            Similarly, if you visit the page url in a new tab, a full page
            loading spinner should appear without flush.
          </li>
          <li>
            After loading is completed auto logged in user content should show
            up without flush.
          </li>
          <li>
            After loading is completed, un-authenticated user should be
            redirected to login page without flush of content.{' '}
          </li>
          <li>
            Clicking on <Link href="/">home</Link>, should not navigate user to
            home page, no flush of content should happen, but a url flush is
            expected.
          </li>
          <li>
            When user is logged in, click on sign-out button on the header.
            Then, full page loader should appear and user should be taken to the
            sign-in page without flush.
          </li>
        </ul>
      </div>

      <hr />

      <div style={{ position: 'relative', minHeight: '100px' }}>
        <Loader loading={!AuthUser.clientInitialized} variant="absolute">
          {AuthUser.email && (
            <div>
              <h1>
                I am authenticated, I am{' '}
                <Loader loading={!AuthUser.clientInitialized}>
                  {AuthUser.email}
                </Loader>
              </h1>
              <button onClick={() => router.push('/user')}>
                go to user page
              </button>
            </div>
          )}
        </Loader>
      </div>
    </Layout>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Authenticated)
