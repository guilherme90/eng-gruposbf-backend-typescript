import { RequestApi } from '@/main/http'

export type CurrencyQuote = {
  code: string
  codein: string
  name: string
  high: number
  low: number
  varBid: number
  pctChange: number
  bid: number
  ask: number
  timestamp: number
  // eslint-disable-next-line camelcase
  create_date: Date
}

export const awesomeRequest = async (coin: string): Promise<CurrencyQuote[]> => {
  const api = new RequestApi<CurrencyQuote>()
  const data = await api.handle({
    url: `/last/${coin}`,
    method: 'GET'
  })

  return Object.keys(data).map((item) => data[item])
}