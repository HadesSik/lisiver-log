import { idToUuid } from 'notion-utils'

export default function getAllPageIds(collectionQuery: any, viewId?: string) {
  const views = Object.values(collectionQuery)[0] as Record<any, any>
  let pageIds = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds
  } else {
    const pageSet = new Set<string>()
    Object.values(views).forEach((view) => {
      view?.collection_group_results?.blockIds?.forEach((id: string) =>
        pageSet.add(id),
      )
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
