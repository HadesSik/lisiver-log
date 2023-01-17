import { Post } from 'types/notion'
import { getDb } from './db'

export const postsInit = async (posts: Post[]) => {
  const db = await getDb()

  await Promise.all(
    posts.map(async (post) => {
      return await db.put('notion', post)
    }),
  )
}
