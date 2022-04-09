import helmet from 'helmet'
import { Express } from 'express'

export const apply = (app: Express) => {
  app.use(helmet())
}
