import { Coin } from '../../../src/domain/entities'
import { prisma } from '../../../src/infrastructure/config'

export default async() => {
  const coins: Coin[] = [{
    name: 'Dólar Americano',
    code: 'USD'
  }, {
    name: 'Dólar Australiano',
    code: 'AUD'
  }, {
    name: 'Dólar Canadense',
    code: 'CAD'
  }, {
    name: 'Libra Esterlina',
    code: 'GBP'
  }, {
    name: 'Iene',
    code: 'JPY'
  }, {
    name: 'Franco Suíço',
    code: 'CHF'
  }, {
    name: 'Renminbi (Yuan)',
    code: 'CNY '
  }, {
    name: 'Peso Argentino',
    code: 'ARS'
  }, {
    name: 'Lira Turca',
    code: 'TRY'
  }, {
    name: 'Rupia indiana',
    code: 'INN'
  }]

  await prisma.coin.createMany({
    data: coins
  })
}