import styled, { css } from 'styled-components'

export const NUM_OF_CIRCLES = 4

export const StyledSvg = styled.svg`
  circle {
    stroke-width: 0.01em;
    fill: none;
    stroke-dasharray: 0.04em 0.25em;
    stroke-linejoin: round;
    stroke-linecap: round;
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }

  ${Array(NUM_OF_CIRCLES)
    .fill(undefined)
    .map(
      (_, index) => css`
        circle.c-${index} {
          stroke: currentColor;
          animation: rotating ${5 - index}s linear infinite;
          stroke-dasharray: ${0.02 * index * 5}em ${0.02 * index * 5}em;
        }
      `
    )};

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
