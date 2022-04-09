import { Product } from '@/domain/entities/product'
import { CurrencyPrice } from '@/domain/entities'

export interface ProductUseCaseInterface {
  findById (id: number): Promise<Product>
  showPrices(product: Product): Promise<CurrencyPrice[]>
}
