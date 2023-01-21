import { NOTION } from '@modules/config'
import {
  getAllPosts,
  getPostBlocks,
  parsePageDataFromBlock,
} from '@modules/notion'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ExtendedRecordMap } from 'notion-types'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Post } from 'types/notion'

interface CustomNextPage {
  postId?: string
  title?: string
  blockMap?: ExtendedRecordMap
}

interface SlugPageParams extends ParsedUrlQuery {
  slug: string
}

const mapPageUrl = (id: string) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

export const getServerSideProps: GetServerSideProps<
  CustomNextPage,
  SlugPageParams
> = async ({ params, query: { id } }) => {
  try {
    let postId: string | undefined = Array.isArray(id) ? id[0] : id
    if (!id) {
      const posts = await getAllPosts({ includePages: true })
      postId = posts.find((post: Post) => post.slug === params?.slug).id
    }

    if (!postId) {
      throw new Error('pass')
    }

    const blockMap = await getPostBlocks(postId)
    const pageInfo = parsePageDataFromBlock(blockMap)

    return {
      props: {
        postId,
        title: pageInfo.title,
        blockMap,
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

const NotionSlugPage: NextPage<CustomNextPage> = ({
  postId,
  title,
  blockMap,
}) => {
  const router = useRouter()

  const cleanUpQuery = () => {
    const slug = router.query.slug
    router.replace(`/notion/${slug}`, undefined, { shallow: true })
  }

  useEffect(() => {
    const queryId = router.query?.['id']
    if (queryId) {
      cleanUpQuery()
    }
  }, [router.query])

  return (
    <div title={NOTION.title} data-description={NOTION.description}>
      <div>postId: {postId}</div>
      <div>title: {NOTION.title}</div>
      <div>description: {NOTION.description}</div>
      <div>
        <div>blockMap(JSON)</div>
        <pre style={{ maxHeight: 300, overflow: 'hidden' }}>
          {JSON.stringify(blockMap, null, 2)}
        </pre>
      </div>
      <div>
        <div className="notion-page">
          <h1 className="font-bold text-3xl text-black dark:text-white">
            {title}
          </h1>
        </div>
        {blockMap && (
          <NotionRenderer
            recordMap={blockMap}
            components={{
              Equation,
              Code,
              Collection,
            }}
            mapPageUrl={mapPageUrl}
            darkMode={true}
          />
        )}
      </div>
    </div>
  )
}

export default NotionSlugPage
