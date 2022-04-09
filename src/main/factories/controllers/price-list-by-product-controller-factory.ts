import { Controller } from '@/presentation'
import { PriceListByProductController } from '@/presentation/controllers/price-list-by-product-controller'
import { makeProductUseCaseFactory } from '@/main/factories'

let controller: Controller
export const makePriceListByProductControllerFactory = (): Controller => {
  if (!controller) {
    controller = new PriceListByProductController(makeProductUseCaseFactory())
  }
  return controller
}
