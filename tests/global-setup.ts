import 'module-alias/register'
import dotenv from 'dotenv'
import { exec } from 'child_process'

dotenv.config({ path: '.env.test' })

export default async () => {
  if (process.env.TEST === 'unit') {
    return
  }

  console.log('\nRUNNING global setup...\n')

  await exec(
    'npx prisma migrate reset --force',
    { env: process.env },
    (error) => {
      if (error){
        console.error(error)
      }
    })
}
