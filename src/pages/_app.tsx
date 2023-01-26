import '../styles/globals.css'
import type { AppProps } from 'next/app'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import GlobalStyle from '@styles/GlobalStyle'
import { ColorModeProvider } from '@styles/ColorModeProvider'
import ThemeProvider from '@styles/ThemeProvider'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ColorModeProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeProvider>
  )
}

export default App
