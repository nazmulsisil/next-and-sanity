import styled from 'styled-components'

export const FallbackComponentWrapper = styled.span`
  color: red;

  & > a {
    text-decoration: underline;
    cursor: pointer;
  }
`
