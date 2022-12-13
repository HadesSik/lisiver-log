import * as NT from 'notion-types'

export type Post = {
  id: string
  date: NT.FormattedDate
  type: string[]
  slug: string
  tags: string[]
  title: string
  status: string[]
  createdTime: string
  fullWidth: boolean
}
