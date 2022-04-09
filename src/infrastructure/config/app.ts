const { env } = process

export const server = {
  port: parseInt(env.APP_PORT, 10),
  env: env.NODE_ENV,
  isDevelopment: env.NODE_ENV === 'development',
  awesomeApiUrl: env.AWESOME_API_URL
}

export default {
  server
}
