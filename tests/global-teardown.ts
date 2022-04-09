import { prisma } from '@/infrastructure/config'

export default async () => {
  console.log('\n Global teardown...')
  prisma.$disconnect()
}
