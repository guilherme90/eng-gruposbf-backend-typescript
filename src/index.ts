import 'module-alias/register'
import 'dotenv/config'
import { serverApp } from '@/presentation/server'

serverApp().catch(err => {
	console.error(err)
	throw err
})
