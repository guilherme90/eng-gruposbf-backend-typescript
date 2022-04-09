export type HttpResponse = {
  statusCode: number
  body: any
}

export type Controller<T = any, Z = any> = {
  handle: (request: T, response: Z) => Promise<Z>
}
