import { Product } from '@/domain/entities'
import { prisma } from '@/infrastructure/config'
import request from 'supertest'
import { Express } from 'express'

describe('#PriceListByProductController', () => {
	let app: Express
	let product: Product

	beforeAll(async () => {
		const { serverApp } = await import('@/presentation/server')
		app = await serverApp()

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
	})

	afterAll(async () => {
		await prisma.product.delete({ where: { id: product.id } })
		await prisma.coin.deleteMany({})
	})

	it('GET /products/{id}/prices with status 404', async () => {
		const { statusCode, body } = await request(app)
			.get('/products/0/prices')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')

		expect(statusCode).toStrictEqual(404)
		expect(body.message).toEqual('Record not found')
	})

	it('GET /products/{id}/prices with status 200', async () => {
		const { statusCode, body } = await request(app)
			.get(`/products/${product.id}/prices`)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')

		expect(statusCode).toStrictEqual(200)
		expect(body.data).toEqual({
			id: product.id,
			name: product.name,
			brand: product.brand,
			price_bid: '219.9',
			price_discount: '189.9',
			prices: [
				{
					name: 'Real Brasileiro/Dólar Americano',
					code: 'USD',
					value: 40.43
				},
				{
					name: 'Real Brasileiro/Libra Esterlina',
					code: 'GBP',
					value: 30.93
				},
				{
					name: 'Real Brasileiro/Peso Argentino',
					code: 'ARS',
					value: 4563.47
				}
			]
		})
	})
})
