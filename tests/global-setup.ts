import 'module-alias/register'
import * as dotenv from 'dotenv'
import { exec } from 'child_process'
import { resolve } from 'path'

dotenv.config({
	path: resolve(process.cwd(), '.env.test')
})

export default async () => {
  if (process.env.TEST === 'unit') {
    return
  }

  console.log('\nRUNNING global setup...\n')

  await exec(
    'npm run prisma:reset-unseed',
    { env: process.env },
    (error) => {
      if (error){
        console.error(error)
      }
    })
}
