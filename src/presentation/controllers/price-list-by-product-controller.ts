import { Controller } from '@/presentation'
import { Response } from 'express'
import { ProductUseCaseInterface } from '@/application/usecases'

type PriceListByProductRequest = {
  params: {
    id: number
  }
}

export class PriceListByProductController implements Controller<PriceListByProductRequest, Response> {
  private readonly useCase: ProductUseCaseInterface
  constructor (useCase: ProductUseCaseInterface) {
    this.useCase = useCase
  }

  handle = async (request: PriceListByProductRequest, response: Response): Promise<Response> => {
    try {
      const { id } = request.params
      const product = await this.useCase.findById(Number(id))
      const prices = await this.useCase.showPrices(product)

      return response.status(200).json({
        data: {
          ...product,
          prices
        }
      })
    } catch (e) {
      return response.status(e.code ?? 500).json({
        message: e.message ?? 'Internal server error'
      })
    }
  }
}
