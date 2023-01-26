import { NOTION } from '@modules/config'
import { postsInit } from '@modules/indexedDb'
import { getAllPosts } from '@modules/notion'
import { useColorModeContext } from '@styles/ColorModeProvider'
import useToggleTheme from 'hooks/useToggleTheme'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { Post } from 'types/notion'

interface CustomNextPage {
  posts: Post[]
}

export const getServerSideProps: GetServerSideProps<
  CustomNextPage
> = async () => {
  const posts = await getAllPosts({ includePages: true })

  return {
    props: {
      posts,
    },
  }
}

const NotionPage: NextPage<CustomNextPage> = ({ posts }) => {
  const { toggleTheme } = useToggleTheme()

  useEffect(() => {
    postsInit(posts)
  }, [posts])

  return (
    <div title={NOTION.title} data-description={NOTION.description}>
      <button
        type="button"
        onClick={() => {
          toggleTheme()
        }}
      >
        test toggle theme
      </button>
      <div>title: {NOTION.title}</div>
      <div>description: {NOTION.description}</div>
      <div>
        <div>posts(JSON)</div>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
      <div>
        <div>posts(go to detail)</div>
        {posts.map((post: Post) => (
          <Link
            key={`post-${post.id}`}
            href={`/notion/${post.slug}?id=${post.id}`}
          >
            <div>
              [{post.slug}] {post.title} - {post.createdTime}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NotionPage
