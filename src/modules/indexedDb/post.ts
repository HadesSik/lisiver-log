import { INDEXED_DB } from '@modules/config'
import { Post } from 'types/notion'
import IndexedDb from './indexedDb'

const getDb = () => {
  const db = new IndexedDb(INDEXED_DB.name, INDEXED_DB.version)

  return db
}

export const getPosts = async (): Promise<Post[]> => {
  const db = getDb()
  const posts = (await db.getAllValue(INDEXED_DB.postKey)) as Post[]

  return posts
}

export const setPost = async (post: Post) => {
  const db = getDb()
  await db.putValue(INDEXED_DB.postKey, post, post.id)
}

export const setPosts = async (posts?: Post[]) => {
  if (!posts) {
    return
  }

  const promiseArray = posts?.map(async (post) => await setPost(post))

  await Promise.all(promiseArray)
}
