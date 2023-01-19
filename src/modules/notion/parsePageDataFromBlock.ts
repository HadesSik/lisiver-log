import { ExtendedRecordMap } from 'notion-types'

export type PageInfo = {
  id: string
  title: string
}

type ParsePageDataFromBlock = (blockMap: ExtendedRecordMap) => PageInfo

export const parsePageDataFromBlock: ParsePageDataFromBlock = (blockMap) => {
  const block = blockMap.block
  const keys = Object.keys(block)
  const pageKey = keys[0]

  const pageBlock = block[pageKey]

  if (pageBlock.value.type !== 'page') {
    console.error('페이지 정보를 찾을 수 없습니다.')
  }

  const value = pageBlock.value

  return {
    id: value.id,
    title: value.properties?.title?.[0]?.[0] || '',
  }
}
