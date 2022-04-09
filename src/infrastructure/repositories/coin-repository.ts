import { Coin } from '@/domain/entities'
import { AbstractDbRepository, CoinRepositoryInterface } from '@/application/repositories'

export class CoinRepository extends AbstractDbRepository implements CoinRepositoryInterface {
  async findAll (): Promise<Coin[]> {
    return await this.client.coin.find()
  }
}
