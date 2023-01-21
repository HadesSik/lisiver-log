import { css, Theme } from '@emotion/react'

const GlobalStyle = (theme: Theme) => css`
  body {
    background-color: ${theme.bgColor};
    color: ${theme.fontColor};
  }
`

export default GlobalStyle
