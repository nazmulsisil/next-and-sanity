import { FullPageLoader } from 'Components/FullPageLoader'
import { Layout } from 'Components/layout'
import { Loader } from 'Components/loader/Loader'
import { WithAuth } from 'Components/with-auth'
import initAuth from 'Config/firebase/auth/utils/init-auth'
import Link from 'next/link'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'

initAuth()

const UnAuthenticated = () => {
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
          <li>For everyone regardless of authenticated or un-authenticated</li>
          <li>On hard reload, loading spinners should appear without flash.</li>
          <li>After loading user is done, UI should update accordingly</li>
        </ul>
      </div>

      <hr />

      <Loader loading={!AuthUser.clientInitialized}>
        <h2 style={{ opacity: AuthUser.email ? 1 : 0.1 }}>
          user is <span style={{ color: 'green' }}>authenticated</span>
        </h2>
        <h2 style={{ opacity: AuthUser.email ? 0.1 : 1 }}>
          user is <span style={{ color: 'red' }}>un-authenticated</span>
        </h2>
      </Loader>

      <div>
        <span>Go to user page here - </span>
        <WithAuth
          isAuthenticated={!!AuthUser.email}
          authLoading={!AuthUser.clientInitialized}
        >
          <button>
            <Link href="/user">user page</Link>
          </button>
        </WithAuth>
      </div>
    </Layout>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: FullPageLoader,
})(UnAuthenticated)
