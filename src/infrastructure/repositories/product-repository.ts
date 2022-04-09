import { Product } from '@/domain/entities'
import { AbstractDbRepository, ProductRepositoryInterface } from '@/application/repositories'

export class ProductRepository extends AbstractDbRepository implements ProductRepositoryInterface {
  async findById (id: number): Promise<Product | null> {
    // @ts-ignore
    return await this.client.product.findFirst({
      where: {
        id: id
      }
    })
  }
}
