import { ENV } from '@modules/config'
import { NotionAPI } from 'notion-client'

export async function getPostBlocks(id: string) {
  const authToken = ENV.NOTION_ACCESS_TOKEN
  const api = new NotionAPI({ authToken })
  const pageBlock = await api.getPage(id)
  return pageBlock
}
