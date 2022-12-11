const ENV = {
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '',
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '',
  SORT_BY_DATE: process.env.SORT_BY_DATE || false,
} as const

export default ENV
