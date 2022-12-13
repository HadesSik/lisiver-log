import { NOTION } from '@modules/config'
import { getAllPosts } from '@modules/notion'
import { NextPage } from 'next'
import Link from 'next/link'
import { Post } from 'types/notion'

export const getStaticProps = async () => {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, NOTION.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > NOTION.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
    },
    revalidate: 1,
  }
}

const NotionPage: NextPage<any> = ({ postsToShow, page, showNext }) => {
  return (
    <div title={NOTION.title} data-description={NOTION.description}>
      <div>title: {NOTION.title}</div>
      <div>description: {NOTION.description}</div>
      <div>page: {page}</div>
      <div>showNext: {showNext}</div>
      <div>
        <div>posts(JSON)</div>
        <pre>{JSON.stringify(postsToShow, null, 2)}</pre>
      </div>
      <div>
        <div>posts(go to detail)</div>
        {postsToShow.map((post: Post) => (
          <Link key={`post-${post.id}`} href={`/notion/detail/${post.id}`}>
            [{post.id}] {post.title} - {post.createdTime}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NotionPage
