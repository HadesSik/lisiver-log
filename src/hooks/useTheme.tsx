import { ThemeMode } from '@styles/theme'
import { useCallback, useEffect, useState } from 'react'

const useTheme = (): [ThemeMode, () => void] => {
  const getInitialTheme = useCallback(() => {
    let theme = window.localStorage.getItem('app_theme') as ThemeMode | null
    const INVALID_THEME = theme !== 'light' && theme !== 'dark'

    if (!theme || INVALID_THEME) {
      const { matches } = window.matchMedia('(prefers-color-scheme: dark)')
      theme = matches ? 'dark' : 'light'
    }

    return theme
  }, [])

  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('app_theme', theme)
  }, [theme])

  return [theme, toggleTheme]
}

export default useTheme
