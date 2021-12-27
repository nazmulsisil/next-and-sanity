import { memo } from 'react'

import { NUM_OF_CIRCLES, StyledSvg } from './Spinner.styles'

export interface SpinnerProps {
  svgSize?: string
}

export const Spinner = memo(function Spinner(props: SpinnerProps) {
  const { svgSize = '1em' } = props

  return (
    <StyledSvg height={svgSize} width={svgSize}>
      <circle cx="0.5em" cy="0.5em" r="0.45em" className="green" />
      <circle cx="0.5em" cy="0.5em" r="0.4em" className="blue" />
      <circle cx="0.5em" cy="0.5em" r="0.35em" className="orange" />

      {Array(NUM_OF_CIRCLES)
        .fill('')
        .map((_el, index) => (
          <circle
            key={index}
            cx="0.5em"
            cy="0.5em"
            r={`${0.45 - index * 0.05}em`}
            className={`c-${index}`}
          />
        ))}
    </StyledSvg>
  )
})
