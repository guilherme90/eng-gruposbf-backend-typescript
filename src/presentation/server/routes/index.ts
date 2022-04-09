import { Express, IRouter } from 'express'
import { routes as currencyRoutes } from '../../routes'

export const applyRoutes = (app: Express, router: IRouter): void => {
  app.use(currencyRoutes(router))
}
