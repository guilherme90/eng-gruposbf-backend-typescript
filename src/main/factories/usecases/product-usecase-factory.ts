import { ProductUseCaseInterface } from '@/application/usecases'
import { ProductUseCase } from '@/domain/usecases'
import { makeCoinRepositoryFactory, makeProductRepositoryFactory } from '@/main/factories'

let useCase: ProductUseCaseInterface
export const makeProductUseCaseFactory = (): ProductUseCaseInterface => {
  if (!useCase) {
    useCase = new ProductUseCase(makeProductRepositoryFactory(), makeCoinRepositoryFactory())
  }
  return useCase
}