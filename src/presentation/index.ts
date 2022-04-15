export type Controller<T = any, Z = any> = {
  handle: (request: T, response: Z) => Promise<Z>
}
