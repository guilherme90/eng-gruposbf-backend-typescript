import { IRouter } from 'express'

import { makePriceListByProductControllerFactory } from '@/main/factories/controllers'

export const routes = (router: IRouter): IRouter => {
  router.get('/product/:id/prices', makePriceListByProductControllerFactory().handle)

  return router
}
