import { useMediaQuery } from 'hooks'
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ThemeMode, themeProperties } from './theme'

interface ColorModeContextValue {
  colorMode: ThemeMode | undefined
  setColorMode: (value: ThemeMode) => void
}

interface ColorModeProviderProps {
  children?: ReactNode
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null)

const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
  const [colorMode, setRawColorMode] = useState<ThemeMode | undefined>(
    undefined,
  )
  const systemPrefers = useMediaQuery('(prefers-color-scheme: dark)')
  const [oldSystemPrefers, setOldSystemPrefers] =
    useState<boolean>(systemPrefers)
  const firstRender = useRef(true)

  // 컬러모드 설정 함수
  const setColorMode = useCallback((value: ThemeMode) => {
    const root = window.document.documentElement
    // 바뀐 값에 대응해 css 변수들도 교체
    Object.entries(themeProperties).forEach(([name, colorByTheme]) => {
      const cssVarName = `--${name}`
      root.style.setProperty(cssVarName, colorByTheme[value])
    })

    setRawColorMode(value)
    window.localStorage.setItem('color-mode', value)
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      const osTheme = systemPrefers ? 'dark' : 'light'
      const userTheme = window.localStorage.getItem('color-mode')
      const theme = (userTheme as ThemeMode) || osTheme
      setRawColorMode(theme)
      firstRender.current = false
    } else if (oldSystemPrefers !== systemPrefers) {
      setColorMode(systemPrefers ? 'dark' : 'light')
      setOldSystemPrefers(systemPrefers)
    }
  }, [systemPrefers, setColorMode, oldSystemPrefers, setOldSystemPrefers])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

const useColorModeContext = () => {
  const context = useContext(ColorModeContext)
  if (context === null) {
    throw new Error('useColorModeContext must be used within a ThemeProvider')
  }
  return context
}

export { ColorModeProvider, useColorModeContext }
