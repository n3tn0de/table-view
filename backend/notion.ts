import { Client } from '@notionhq/client'

const {
  NOTION_SECRET,
} = process.env

export const notion = new Client({
  auth: NOTION_SECRET,
})

console.log('Notion client authenticated\n')
