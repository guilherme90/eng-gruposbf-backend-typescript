import { Product } from '@/domain/entities'
import { prisma } from '@/infrastructure/config'
import request from 'supertest'
import { Express } from 'express'

describe('#PriceListByProductController', () => {
	let app: Express
	let product: Product

	beforeAll(async () => {
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

		const { serverApp } = await import('@/presentation/server')
		app = await serverApp()
	})

	afterAll(async () => {
		await prisma.product.delete({ where: { id: product.id } })
		await prisma.coin.deleteMany({})
	})

	it('GET /product/{id}/prices with status 404', async () => {
		await request(app)
			.get('/products/0/prices')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.expect(404)
	})

	it('GET /product/{id}/prices with status 200', async () => {
		const response = await request(app)
			.get(`/products/${product.id}/prices`)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')

		console.log(response.statusCode)
	})
})
