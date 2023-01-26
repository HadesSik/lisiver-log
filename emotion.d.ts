import '@emotion/react'
import { ThemeMode } from '@styles/theme'

declare module '@emotion/react' {
  export interface Theme extends Record<unknown, unknown> {
    mode: ThemeMode
    textColor: string
    backgroundColor: string
    borderColor: string
    bodyColor: string
  }
}
