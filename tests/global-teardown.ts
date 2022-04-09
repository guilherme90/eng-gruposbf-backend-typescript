import { prisma } from '@/infrastructure/config'

export default async () => {
  if (process.env.TEST === 'unit') {
    return
  }

  console.log('\n Global teardown...')
  await prisma.$disconnect()
}
