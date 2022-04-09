import { prisma } from '@/infrastructure/config'
import { ProductRepository } from '@/infrastructure/repositories'
import { ProductRepositoryInterface } from '@/application/repositories'

let repository: ProductRepositoryInterface
export const makeProductRepositoryFactory = (): ProductRepositoryInterface => {
  if (!repository) {
    repository = new ProductRepository(prisma)
  }
  return repository
}
