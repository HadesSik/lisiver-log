import { ReactNode } from 'react'
import { lightTheme, darkTheme } from '../styles/theme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { useColorModeContext } from './ColorModeProvider'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorModeContext()

  return (
    <EmotionThemeProvider
      theme={colorMode === 'light' ? lightTheme : darkTheme}
    >
      {children}
    </EmotionThemeProvider>
  )
}

export default ThemeProvider
