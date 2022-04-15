import { awesomeUrlFormatter } from '@/utils'

describe('#AwesomeUrlFormatter', () => {
	const coins = [
		{ code: 'USD' },
		{ code: 'EUR' },
		{ code: 'GBP' }
	]

	it('Should create string of coins', () => {
		const url = awesomeUrlFormatter(coins)
		expect(url).toEqual('BRL-USD,BRL-EUR,BRL-GBP')
	})
})
