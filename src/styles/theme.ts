import { Theme as EmotionTheme } from '@emotion/react'

export type ThemeMode = 'light' | 'dark'

export const light: EmotionTheme = {
  bgColor: '#ffffff',
  fontColor: '#00000',
}

export const dark: EmotionTheme = {
  bgColor: '#000000',
  fontColor: '#eeeeee',
}

const Theme = {
  light,
  dark,
}

export default Theme
