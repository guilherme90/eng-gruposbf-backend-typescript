import { Product } from '@/domain/entities/product'
import { NotFound } from '@/application/errors/not-found'
import { ProductUseCaseInterface } from '@/application/usecases'
import { ProductRepositoryInterface } from '@/application/repositories'

export class ProductUseCase implements ProductUseCaseInterface {
  private readonly repository: ProductRepositoryInterface

  constructor (repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async findById (id: number): Promise<Product> {
    const data = await this.repository.findById(id)

    if (!data) {
      throw new NotFound()
    }

    return data
  }
}
