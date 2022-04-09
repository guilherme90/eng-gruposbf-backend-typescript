import { IRouter } from 'express'

import { makeCurrencyListControllerFactory } from '@/main/factories/controllers'

export const routes = (router: IRouter): IRouter => {
  router.get('/currencies', makeCurrencyListControllerFactory().handle)

  return router
}
