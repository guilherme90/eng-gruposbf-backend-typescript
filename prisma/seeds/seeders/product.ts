import { Product } from '../../../src/domain/entities/product'
import { prisma } from '../../../src/infrastructure/config'

export default async() => {
  const products: Product[] = [{
    name: 'Tênis Nike Shox R4 - Masculino',
    brand: 'Nike',
    price_bid: 749.99,
    price_discount: 529.99
  }]

  await prisma.product.createMany({
    data: products
  })
}