import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends Record<unknown, unknown> {
    bgColor: string
    fontColor: string
  }
}
