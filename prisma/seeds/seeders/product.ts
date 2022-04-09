import { prisma } from '../../../src/infrastructure/config'

export default async(): Promise<void> => {
  await prisma.product.createMany({
    data: [{
      name: 'Tênis Nike Shox R4 - Masculino',
      brand: 'Nike',
      price_bid: 749.99,
      price_discount: 529.99
    }]
  })
}