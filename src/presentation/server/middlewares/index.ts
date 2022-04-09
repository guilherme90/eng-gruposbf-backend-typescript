import { Express } from 'express'
import { apply as bodyParser } from './body-parser'
import { apply as helmet } from './helmet'
import { apply as cors } from './cors'

export const applyMiddlewares = (app: Express) => {
  bodyParser(app)
  helmet(app)
  cors(app)
}