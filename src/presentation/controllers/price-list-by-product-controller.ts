import { Controller } from '@/presentation'
import { Response } from 'express'
import { ProductUseCaseInterface } from '@/application/usecases'

type PriceListByProductControllerRequest = {
  id: number
}

export class PriceListByProductController implements Controller<PriceListByProductControllerRequest, Response> {
  private readonly useCase: ProductUseCaseInterface
  constructor (useCase: ProductUseCaseInterface) {
    this.useCase = useCase
  }

  async handle (request: PriceListByProductControllerRequest, response: Response): Promise<Response> {
    try {
      const product = await this.useCase.findById(request.id)
      const prices = await this.useCase.showPrices(product)

      return response.status(200).json({
        data: {
          ...product,
          prices
        }
      })
    } catch (e) {
      return response.status(e.code ?? 500).json({
        message: e.message ?? 'Internal server error',
        e
      })
    }
  }
}
