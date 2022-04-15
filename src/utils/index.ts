import { Coin } from '@/domain/entities'

export function awesomeUrlFormatter (coins: Pick<Coin, 'code'>[]): string {
	let url: string = ''
	coins.map(coin => url += `BRL-${coin.code},`)

	return url.slice(0, -1)
}
