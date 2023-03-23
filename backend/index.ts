import express, { Express, Request, Response, NextFunction } from 'express'

import { router } from './routes'

const {
  PORT=5000,
  VERSION='v1',
} = process.env

const prefix = `/api/${VERSION}`

const app: Express = express()

app.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.path)
  next()
})

app.use(prefix, router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
