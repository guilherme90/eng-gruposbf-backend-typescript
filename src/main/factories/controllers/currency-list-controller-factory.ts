import { Controller } from '@/presentation'
import { CurrencyListController } from '@/presentation/controllers/currency-list-controller'

let controller: Controller
export const makeCurrencyListControllerFactory = (): Controller => {
  if (!controller) {
    controller = new CurrencyListController()
  }
  return controller
}
