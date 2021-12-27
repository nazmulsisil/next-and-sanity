import { Loader } from 'Components/loader'
import React from 'react'

export const FullPageLoader = React.memo(function FullPageLoader() {
  return <Loader loading={true} variant="fullPage" />
})
