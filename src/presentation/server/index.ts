import express from 'express'
import { server } from '@/infrastructure/config'
import { applyMiddlewares } from './middlewares'
import { applyRoutes } from '@/presentation/server/routes'

export const serverApp = () => {
  const app = express()
  const router = express.Router()

  app.use(express.json())

  applyMiddlewares(app)
  applyRoutes(app, router)
  app.get('/', (_req, res) => {
    return res.status(200).json({ v: '1.0.0' })
  })

  app.listen(server.port, () => console.log(`http://localhost:${server.port}`))
}
