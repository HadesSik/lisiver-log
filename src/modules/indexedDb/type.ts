import { DBSchema } from 'idb'
import { Post } from 'types/notion'

export interface MyDB extends DBSchema {
  notion: {
    value: Post
    key: string
    indexes: {
      'by-slug': Post['slug']
    }
  }
}
