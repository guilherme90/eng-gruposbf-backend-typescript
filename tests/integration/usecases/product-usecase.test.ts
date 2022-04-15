import { prisma } from '@/infrastructure/config'
import { ProductUseCaseInterface } from '@/application/usecases'
import { ProductUseCase } from '@/domain/usecases'
import { makeCoinRepositoryFactory, makeProductRepositoryFactory } from '@/main/factories'
import { Product } from '@/domain/entities/product'
import { Coin, CurrencyPrice } from '@/domain/entities'

describe('ProductUseCase', () => {
  let product: Product
	let coins: Coin[]
  let useCase: ProductUseCaseInterface
	const coinsToCalculateMock = {
		'BRLUSD': {
			code: 'BRL',
			codein: 'USD',
			name: 'Real Brasileiro/Dólar Americano',
			high: '0.2129',
			low: '0.2127',
			varBid: '0.0002',
			pctChange: '0.11',
			bid: '0.2129',
			ask: '0.2129',
			timestamp: '1650025382',
			create_date: '2022-04-15 09:23:02'
		},
		'BRLARS': {
			code: 'BRL',
			codein: 'ARS',
			name: 'Real Brasileiro/Peso Argentino',
			high: '24.0329',
			low: '24.0038',
			varBid: '0.0416',
			pctChange: '0.17',
			bid: '24.0139',
			ask: '24.052',
			timestamp: '1650025382',
			create_date: '2022-04-15 09:23:02'
		},
		'BRLGBP': {
			code: 'BRL',
			codein: 'GBP',
			name: 'Real Brasileiro/Libra Esterlina',
			high: '0.163',
			low: '0.1626',
			varBid: '0.0013',
			pctChange: '0.83',
			bid: '0.1629',
			ask: '0.163',
			timestamp: '1650028562',
			create_date: '2022-04-15 10:16:02'
		}
	}

  beforeAll(async () => {
    useCase = new ProductUseCase(makeProductRepositoryFactory(), makeCoinRepositoryFactory())

		// @ts-ignore
		product = await prisma.product.create({
			data: {
				name: 'Product 1',
				brand: 'Nike',
				price_bid: 219.9,
				price_discount: 189.9
			}
		})

		await prisma.coin.createMany({
			data: [
				{
					name: 'Dólar Americano',
					code: 'USD'
				},
				{
					name: 'Libra Esterlina',
					code: 'GBP'
				},
				{
					name: 'Peso Argentino',
					code: 'ARS'
				}
			]
		})

		coins = await prisma.coin.findMany({})
  })

  afterAll(async () => {
    await prisma.product.delete({ where: { id: product.id } })
		await prisma.coin.deleteMany({})
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

	it('#calculatePrices', async () => {
		const coinsToCalculate = Object.keys(coinsToCalculateMock).map((item) => coinsToCalculateMock[item])
		const productPrices = await useCase.calculatePrices(coins, product, coinsToCalculate)

		expect(productPrices).toEqual(
			expect.arrayContaining([
				{
					name: 'Real Brasileiro/Dólar Americano',
					code: 'USD',
					value: 40.43
				},
				{
					name: 'Real Brasileiro/Peso Argentino',
					code: 'ARS',
					value: 4560.24
				},
				{
					name: 'Real Brasileiro/Libra Esterlina',
					code: 'GBP',
					value: 30.93
				}
			])
		)
	})
})
