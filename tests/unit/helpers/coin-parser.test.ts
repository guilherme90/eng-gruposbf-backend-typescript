import { coinParser } from '@/application/helpers'

describe('#CoinParser', ()=> {
  const coins = ['USD', 'EUR', 'GBP']

  it('Should create string of coins', () => {
    const parser = coinParser('BRL', coins)
    expect(parser).toEqual('USD-BRL,EUR-BRL,GBP-BRL')
  })
})