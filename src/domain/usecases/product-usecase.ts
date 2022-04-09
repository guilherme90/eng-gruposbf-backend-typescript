import { CurrencyPrice, Product } from '@/domain/entities'
import { NotFound, BadRequest } from '@/application/errors'
import { ProductUseCaseInterface } from '@/application/usecases'
import { CoinRepositoryInterface, ProductRepositoryInterface } from '@/application/repositories'
import { awesomeRequest } from '@/main/http/awesome/list-coins'

export class ProductUseCase implements ProductUseCaseInterface {
  private readonly repository: ProductRepositoryInterface
  private readonly coinRepository: CoinRepositoryInterface

  constructor (repository: ProductRepositoryInterface, coinRepository: CoinRepositoryInterface) {
    this.repository = repository
    this.coinRepository = coinRepository
  }

  async findById (id: number): Promise<Product> {
    const data = await this.repository.findById(id)

    if (!data) {
      throw new NotFound()
    }

    return data
  }

  async showPrices (product: Product): Promise<CurrencyPrice[]> {
    const prices: CurrencyPrice[] = []
    const coins = await this.coinRepository.findAll()
    if (!coins.length) {
      throw new BadRequest('Empty coins list')
    }

    await Promise.all(coins.map(async (coin) => {
      const response = await awesomeRequest(`BRL-${coin}`)
      response.forEach((item) => {
        prices.push({
          name: item.name,
          code: item.codein,
          value: parseFloat((item.bid * product.price_discount).toFixed(2))
        })
      })
    }))
    return Promise.resolve(prices)
  }
}
