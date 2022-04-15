import 'module-alias/register'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({
	path: resolve(process.cwd(), '.env.test')
})

export default async () => {}
