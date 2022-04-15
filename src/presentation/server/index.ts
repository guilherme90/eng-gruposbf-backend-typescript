import express, { Express } from 'express'
import { server } from '@/infrastructure/config'
import { applyMiddlewares } from './middlewares'
// import { applyRoutes } from '@/presentation/server/routes'
import { routes as priceListByProductRoutes } from '@/presentation/routes'

export const serverApp = async (): Promise<Express> => {
  const app = express()
  const router = express.Router()

  app.use(express.json())

  applyMiddlewares(app)
  // applyRoutes(app, router)
  app.get('/', (_req, res) => {
    return res.status(200).json({ v: '1.0.0' })
  })

	app.use(priceListByProductRoutes(router))

  app.listen(server.port, () => console.log(`http://localhost:${server.port}`))

	return app
}
