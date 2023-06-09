import express, { Request, Response } from 'express'

import { notion } from '../notion'

const {
  NOTION_DB='8af0391775274da183f338f61e911d25',
  DEFAULT_FILTER_DEPTH=2,
} = process.env

export const getDb = async (req: Request, res: Response) => {

  const { id=NOTION_DB, sorts=[], filter } = req.body

  let query

  try {
    query = await notion.databases.query({
      database_id: id,
      sorts,
    })

    let columnsMap = {}

    const list = query.results.map(({properties}) => {
      return Object.entries(properties).reduce((acc, [key, value]: any) => {
        // Transpose
        // columnsMap = {
        //   ...columnsMap,
        //   [key]: columnsMap[key] ? [
        //     ...columnsMap[key],
        //     value,
        //   ] : [value]
        // }
        const { type, id } = value;

        columnsMap = {
          ...columnsMap,
          [key]: {id, type},
        }

        let data = value[type];

        return { ...acc, [key]: {
          id,
          type,
          value: data,
        }}
      }, {})
    })
    res.json({list, columnsMap, DEFAULT_FILTER_DEPTH})
  } catch (error) {
    const defaultMessage = "Unknown error"
    const {
      status=500,
      body,
      message=defaultMessage,
    } = error|| {}
    res.status(status).send(body || {message})
    return
  }
}
