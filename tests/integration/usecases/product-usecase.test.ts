import { prisma } from '@/infrastructure/config'
import { ProductUseCaseInterface } from '@/application/usecases'
import { ProductUseCase } from '@/domain/usecases'
import { makeCoinRepositoryFactory, makeProductRepositoryFactory } from '@/main/factories'
import { Product } from '@/domain/entities/product'

describe('ProductUseCase', () => {
  let product: Product
  let useCase: ProductUseCaseInterface

  beforeAll(() => {
    useCase = new ProductUseCase(makeProductRepositoryFactory(), makeCoinRepositoryFactory())
  })

  beforeEach(async () => {
    // @ts-ignore
    product = await prisma.product.create({
      data: {
        name: 'Product 1',
        brand: 'Nike',
        price_bid: 219.9,
        price_discount: 189.9
      }
    })
  })

  afterAll(async () => {
    await prisma.product.delete({
      where: {
        id: product.id
      }
    })
    useCase = null
  })

  it('#findById - Throw exception when product not found', async () => {
    try {
      await useCase.findById(0)
    } catch (e) {
      expect(e.code).toEqual(404)
    }
  })

  it('#findById', async () => {
    const payload = await useCase.findById(product.id)

    expect(payload).toMatchObject({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price_bid: product.price_bid,
      price_discount: product.price_discount
    })
  })
})
