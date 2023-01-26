import { Theme } from '@emotion/react'

export type ThemeMode = 'light' | 'dark'

const lightTheme: Theme = {
  mode: 'light',
  textColor: 'black',
  backgroundColor: '#fafafa',
  borderColor: '#eaeaea',
  bodyColor: 'white',
}

const darkTheme: Theme = {
  mode: 'dark',
  textColor: 'white',
  backgroundColor: '#111',
  borderColor: '#222',
  bodyColor: 'black',
}

const COLOR_MODE_KEY = 'color-mode'
const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode'

const themeProperties = {
  'mode-color': {
    light: lightTheme.mode,
    dark: darkTheme.mode,
  },
  'text-color': {
    light: lightTheme.textColor,
    dark: darkTheme.textColor,
  },
  'background-color': {
    light: lightTheme.backgroundColor,
    dark: darkTheme.backgroundColor,
  },
  'border-color': {
    light: lightTheme.borderColor,
    dark: darkTheme.borderColor,
  },
  'body-color': {
    light: lightTheme.bodyColor,
    dark: darkTheme.bodyColor,
  },
}

export {
  lightTheme,
  darkTheme,
  themeProperties,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
}
