import bodyParser from 'body-parser'
import { Express } from 'express'

export const apply = (app: Express) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
}
