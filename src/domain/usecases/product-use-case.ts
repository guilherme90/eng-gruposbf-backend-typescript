import { Coin, CurrencyPrice, Product } from '@/domain/entities'
import { NotFound, BadRequest } from '@/application/errors'
import { ProductUseCaseInterface } from '@/application/usecases'
import { CoinRepositoryInterface, ProductRepositoryInterface } from '@/application/repositories'
import { awesomeRequest, CurrencyQuote } from '@/main/http/awesome/list-coins'

export class ProductUseCase implements ProductUseCaseInterface {
  constructor (
		private readonly repository: ProductRepositoryInterface,
		private readonly coinRepository: CoinRepositoryInterface
	) {}

  async findById (id: number): Promise<Product> {
    const data = await this.repository.findById(id)

    if (!data) {
      throw new NotFound()
    }

    return data
  }

	async calculatePrices(coins: Coin[], product: Product, coinsToCalculate: CurrencyQuote[]): Promise<CurrencyPrice[]> {
		const prices: CurrencyPrice[] = []
		await Promise.all(coins.map(async (coin) => {
			coinsToCalculate.forEach((item) => {
				prices.push({
					name: item.name,
					code: item.codein,
					value: parseFloat((item.bid * product.price_discount).toFixed(2))
				})
			})
		}))
		return Promise.resolve(prices)
	}

	async showPrices(product: Product): Promise<CurrencyPrice[]> {
    const coins = await this.coinRepository.findAll()
    if (!coins.length) {
      throw new BadRequest('Empty coins list')
    }

		const map: CurrencyQuote[][] = await Promise.all(coins.map(async coin => {
			return await awesomeRequest(`BRL-${coin.code}`)
		}))

    return this.calculatePrices(coins, product, map[0])
  }
}
