const ENV = {
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '',
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '',
} as const

export default ENV
