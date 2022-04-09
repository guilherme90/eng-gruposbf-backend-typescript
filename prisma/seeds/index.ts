// eslint-disable-next-line import/no-named-default
import { default as seedCoin } from './seeders/coin'
// eslint-disable-next-line import/no-named-default
import { default as seedProduct } from './seeders/product'

export const seed = async () => {
  await seedProduct()
  await seedCoin()
}
