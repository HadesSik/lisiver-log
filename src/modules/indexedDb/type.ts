import { DBSchema } from 'idb'

export interface MyDB extends DBSchema {
  notion: {
    value: {
      id: string
      slug: string
      title: string
    }
    key: string
    indexes: {
      'by-slug': number
    }
  }
}
