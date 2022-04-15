import { Coin, CurrencyPrice, Product } from '@/domain/entities'
import { NotFound, BadRequest } from '@/application/errors'
import { ProductUseCaseInterface } from '@/application/usecases'
import { CoinRepositoryInterface, ProductRepositoryInterface } from '@/application/repositories'
import { awesomeRequest, CurrencyQuote } from '@/main/http/awesome/list-coins'
import { awesomeUrlFormatter } from '@/utils'

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
			const currentCoin: any = coinsToCalculate.filter((item) => item.codein === coin.code)[0]
			prices.push({
				name: currentCoin.name,
				code: currentCoin.codein,
				value: parseFloat((currentCoin.bid * product.price_discount).toFixed(2))
			})
		}))
		return Promise.resolve(prices)
	}

	async showPrices(product: Product): Promise<CurrencyPrice[] | any> {
    const coins = await this.coinRepository.findAll()
    if (!coins.length) {
      throw new BadRequest('Empty coins list')
    }

		const coinsToCalculate: CurrencyQuote[] = await awesomeRequest(awesomeUrlFormatter(coins))
    return this.calculatePrices(coins, product, coinsToCalculate)
  }
}
