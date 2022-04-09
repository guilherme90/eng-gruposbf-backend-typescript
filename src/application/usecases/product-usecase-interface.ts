import { Product } from '@/domain/entities/product'

export interface ProductUseCaseInterface {
  findById (id: number): Promise<Product>
}
