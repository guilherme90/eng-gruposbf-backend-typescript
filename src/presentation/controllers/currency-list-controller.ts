import { Controller } from '@/presentation'
import { Response } from 'express'

type CurrencyListControllerRequest = {
  take: number
  limit: number
}

export class CurrencyListController implements Controller<CurrencyListControllerRequest, Response> {
  async handle (request: CurrencyListControllerRequest, response: Response): Promise<Response> {
    return response.status(200).json({
      data: [{
        currency: 'BRL'
      }]
    })
  }
}
