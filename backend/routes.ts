import express, { Express, Request, Response, Router } from 'express'

import { getDb } from './controllers'

export const router: Router = express.Router()

router.get('/db', getDb)
router.get('/db/:id', getDb)
