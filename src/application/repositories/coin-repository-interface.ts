import { Coin } from '@/domain/entities'

export interface CoinRepositoryInterface {
  findAll(): Promise<Coin[]>
}