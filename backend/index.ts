
import express, { Express, Request, Response, Router } from 'express'
import { Client } from '@notionhq/client'

const {
  PORT=5000,
  NOTION_SECRET,
  NOTION_DB='8af0391775274da183f338f61e911d25',
} = process.env

const prefix = `/api/v1`

const app: Express = express()
const router: Router = express.Router()

const notion = new Client({
  auth: NOTION_SECRET,
})

router.get('/', async (req: Request, res: Response) => {
  console.log(prefix + req.route.path)

  let query

  try {
    query = await notion.databases.query({
      database_id: NOTION_DB,
    })

    let columnsMap = {}

    const list = query.results.map(({properties}) => {
      return Object.entries(properties).reduce((acc, [key, value]) => {
        // columnsMap = {
        //   ...columnsMap,
        //   [key]: columnsMap[key] ? [
        //     ...columnsMap[key],
        //     value,
        //   ] : [value]
        // }
        columnsMap = {
          ...columnsMap,
          [key]: value
        }
        return { ...acc, [key]: value}
      }, {})
    })
    res.json({list, columnsMap})
  } catch (error) {
    const defaultMessage = "Unknown error"
    const {
      status=500,
      body,
      message
    } = error|| {}
    res.status(status).send(body || {message} || {defaultMessage})
    return
  }
})

app.use(prefix, router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
