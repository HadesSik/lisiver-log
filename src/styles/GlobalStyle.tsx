import { css, Global, Theme, useTheme } from '@emotion/react'

const globalStyles = (theme: Theme) => css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: var(--body-color);
    transition: background 0.3s, color 0.3s;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
  body {
    color: var(--text-color);
  }
`

const GlobalStyles = () => {
  const theme = useTheme()
  return <Global styles={globalStyles(theme)} />
}

export default GlobalStyles
