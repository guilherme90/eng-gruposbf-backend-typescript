export interface CoinRepositoryInterface {
  findAll(): Promise<string[]>
}