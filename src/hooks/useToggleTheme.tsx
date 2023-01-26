import { useColorModeContext } from '@styles/ColorModeProvider'
import { ThemeMode } from '@styles/theme'
import { useCallback, useMemo } from 'react'

interface IFUseToggleTheme {
  currentTheme: ThemeMode | undefined
  toggleTheme: () => void
}

const useToggleTheme = (): IFUseToggleTheme => {
  const { colorMode, setColorMode } = useColorModeContext()

  const currentTheme = useMemo(() => colorMode, [colorMode])
  const toggleTheme = useCallback(() => {
    setColorMode(currentTheme === 'dark' ? 'light' : 'dark')
  }, [currentTheme, setColorMode])

  return {
    currentTheme,
    toggleTheme,
  }
}

export default useToggleTheme
