import { Express } from 'express'
import cors from 'cors'

export const apply = (app: Express) => {
  app.use(cors())
}
