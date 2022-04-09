import { prisma } from '@/infrastructure/config'
import { CoinRepository } from '@/infrastructure/repositories'
import { CoinRepositoryInterface } from '@/application/repositories'

let repository: CoinRepositoryInterface
export const makeCoinRepositoryFactory = (): CoinRepositoryInterface => {
  if (!repository) {
    repository = new CoinRepository(prisma)
  }
  return repository
}
