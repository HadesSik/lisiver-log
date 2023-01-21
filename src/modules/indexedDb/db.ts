import { INDEXED_DB } from '@modules/config'
import { IDBPDatabase, openDB } from 'idb'
import { MyDB } from './type'

export const getDb = async (): Promise<IDBPDatabase<MyDB>> => {
  const db = await openDB<MyDB>(INDEXED_DB.name, INDEXED_DB.version, {
    upgrade: (db) => {
      const notion = db.createObjectStore('notion', {
        keyPath: 'id',
      })

      notion.createIndex('by-slug', 'slug')
    },
  })

  return db
}
