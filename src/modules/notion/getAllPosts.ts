import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import filterPublishedPosts from './filterPublishedPosts'
import { ENV, NOTION } from '@modules/config'

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts({ includePages = false }) {
  let id = ENV.NOTION_PAGE_ID
  const authToken = ENV.NOTION_ACCESS_TOKEN
  const api = new NotionAPI({ authToken })
  const response = await api.getPage(id)

  id = idToUuid(id)
  const collection = Object.values(response.collection)[0]?.value
  const collectionQuery = response.collection_query
  const block = response.block
  const schema = collection?.schema

  const rawMetadata = block[id].value

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.error(`pageId "${id}" is not a database`)
    return null
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties: any =
        (await getPageProperties(id, block, schema)) || null

      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time,
      ).toString()
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false

      data.push(properties)
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages })

    // Sort by date
    if (NOTION.sortByDate) {
      posts.sort((a: any, b: any) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime)
        const dateB = new Date(b?.date?.start_date || b.createdTime)
        return dateB.getTime() - dateA.getTime()
      })
    }
    return posts
  }
}
