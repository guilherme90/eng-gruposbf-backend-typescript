import { HttpError } from '@/application/errors'

export class BadRequest implements HttpError {
  public name = 'bad-request'
  public message = 'Error to process request'
  public code: number

  constructor (message?: string) {
    this.message = message ?? this.message
    this.code = 400
  }
}