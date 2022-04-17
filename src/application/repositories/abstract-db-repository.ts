import { PrismaClient } from '@prisma/client'

export class AbstractDbRepository {
  protected readonly client: PrismaClient

  constructor (client: PrismaClient) {
    this.client = client
  }
}
