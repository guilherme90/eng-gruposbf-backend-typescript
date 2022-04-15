import { Product } from '@/domain/entities/product'
import { Coin, CurrencyPrice } from '@/domain/entities'
import { CurrencyQuote } from '@/main/http/awesome/list-coins'

export interface ProductUseCaseInterface {
  findById(id: number): Promise<Product>
	calculatePrices(coins: Coin[], product: Product, coinsToCalculate: CurrencyQuote[]): Promise<CurrencyPrice[]>
  showPrices(product: Product): Promise<CurrencyPrice[]>
}
