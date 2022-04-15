import { Express, IRouter } from 'express'
import { routes as priceListByProductRoutes } from '../../routes'

export const applyRoutes = (app: Express, router: IRouter): void => {
  app.use(priceListByProductRoutes(router))
}
