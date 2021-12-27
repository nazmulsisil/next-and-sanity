import { Spinner } from 'Components/spinner'
import { ReactNode } from 'react'

import {
  AbsoluteWrapper,
  FullPageWrapper,
  InlineWrapper,
} from './Loader.styles'

export interface LoaderProps {
  loading: boolean
  children?: ReactNode
  variant?: 'inline' | 'fullPage' | 'absolute'
}

export const Loader = (props: LoaderProps) => {
  const { children = null, loading, variant = 'inline' } = props

  if (!loading) {
    return <>{children}</>
  }

  switch (variant) {
    case 'fullPage':
      return (
        <FullPageWrapper>
          <Spinner />
        </FullPageWrapper>
      )

    case 'absolute':
      return (
        <AbsoluteWrapper>
          <Spinner />
        </AbsoluteWrapper>
      )

    default:
    case 'inline':
      return (
        <InlineWrapper>
          <Spinner />
        </InlineWrapper>
      )
  }
}
