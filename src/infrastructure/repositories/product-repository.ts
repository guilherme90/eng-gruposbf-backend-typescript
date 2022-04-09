import { Product } from '@/domain/entities'
import { AbstractDbRepository, ProductRepositoryInterface } from '@/application/repositories'

export class ProductRepository extends AbstractDbRepository implements ProductRepositoryInterface {
  async findById (id: number): Promise<Product | null> {
    return await this.client.product.findUnique({
      where: {
        id: id
      }
    })
  }
}
