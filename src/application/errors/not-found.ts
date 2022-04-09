import { HttpError } from '@/application/errors'

export class NotFound implements HttpError {
  public name = 'not-found'
  public message = 'Record not found'
  public code: number

  constructor (message?: string) {
    this.message = message ?? this.message
    this.code = 404
  }
}