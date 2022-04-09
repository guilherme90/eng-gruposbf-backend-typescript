export type HttpError = Error & {
  code: number
}

export * from './bad-request'
export * from './not-found'
