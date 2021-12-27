import initAuth from 'Config/firebase/auth/utils/init-auth'
import dynamic from 'next/dynamic'
import { AuthAction, withAuthUser } from 'next-firebase-auth'
import React from 'react'

initAuth()

const FirebaseAuth = dynamic<{}>(() =>
  import('Components/firebase-auth').then((mod) => mod.FirebaseAuth)
)

const Login = () => {
  return <FirebaseAuth />
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
  appPageURL: '/authenticated',
})(Login)
