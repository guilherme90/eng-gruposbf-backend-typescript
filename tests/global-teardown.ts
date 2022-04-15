import { prisma } from '@/infrastructure/config'

export default async () => {
  if (process.env.TEST === 'unit') {
    return
  }

	console.info(`\nStarting global teardown\n`)
	await prisma.$disconnect()
	process.exit()
	console.info(`\nGlobal teardown finished!\n`)
}
