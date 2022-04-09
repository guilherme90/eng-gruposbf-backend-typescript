import { Product } from '@/domain/entities'

export interface ProductRepositoryInterface {
  findById(id: number): Promise<Product | null>
}