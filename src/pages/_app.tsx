import '../styles/globals.css'
import type { AppProps } from 'next/app'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import { Global, ThemeProvider } from '@emotion/react'
import { useTheme } from 'hooks'
import THEME from '@styles/theme'
import GlobalStyle from '@styles/GlobalStyle'

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, toggleTheme] = useTheme()

  return (
    <ThemeProvider theme={THEME[theme]}>
      <Global styles={GlobalStyle(THEME[theme])} />
      <button
        type="button"
        onClick={() => {
          toggleTheme()
        }}
      >
        testForTheme
      </button>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
