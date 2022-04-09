import { PrismaClient } from '@prisma/client'

export class AbstractDbRepository {
  protected readonly client

  constructor (client: PrismaClient) {
    this.client = client
  }
}