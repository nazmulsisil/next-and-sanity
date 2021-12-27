import { Loader } from 'Components/loader/Loader'
import Link from 'next/link'
import { ReactElement } from 'react'

import { FallbackComponentWrapper } from './WithAuth.styles'

interface WithAuthProps {
  children: ReactElement
  authLoading: boolean
  isAuthenticated: boolean

  // fallback component for un-authenticated users
  fallback?: ReactElement
}

export const WithAuth = (props: WithAuthProps) => {
  const { children, authLoading, isAuthenticated, fallback } = props

  return (
    <Loader loading={authLoading}>
      {isAuthenticated
        ? children
        : fallback || (
            <FallbackComponentWrapper>
              Please <Link href="/login">login</Link>
            </FallbackComponentWrapper>
          )}
    </Loader>
  )
}
