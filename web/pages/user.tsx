import { Layout } from 'Components/layout'
import { Loader } from 'Components/loader/Loader'
import initAuth from 'Config/firebase/auth/utils/init-auth'
import { useRouter } from 'next/router'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import React from 'react'

initAuth()

export const User = () => {
  const router = useRouter()
  const AuthUser = useAuthUser()

  return (
    <Layout
      authLoading={!AuthUser.clientInitialized}
      email={AuthUser.email}
      signOut={AuthUser.signOut}
    >
      <div>
        <h1>
          <span>Hello, </span>
          <Loader loading={!AuthUser.clientInitialized}>
            {AuthUser.email}
          </Loader>
        </h1>

        <h1>next-firebase-auth made easy</h1>

        <button
          style={{ fontSize: '3rem', minWidth: '300px' }}
          onClick={() => {
            if (AuthUser.clientInitialized) {
              router.push(
                AuthUser.email ? '/authenticated' : '/un-authenticated'
              )
            }
          }}
        >
          <Loader loading={!AuthUser.clientInitialized}>
            {AuthUser.email
              ? 'go to authenticated page'
              : 'go to un-authenticated page'}
          </Loader>
        </button>
      </div>
    </Layout>
  )
}

export default withAuthUser()(User)
