import { schedule } from 'node-cron'

import { ReceiveCatalogMessage } from '../../core/data/index.js'

import { CreateCatalog } from '../data/index.js'

export class CatalogModule {
  static async initialize() {
    const receiverCatalog = new ReceiveCatalogMessage()

    return schedule('*/10 * * * * *', async () => {
      const result = await receiverCatalog.execute()

      if (!result.Messages) return

      result.Messages.forEach((message) => {
        const { ownerId } = receiverCatalog.getBody(message)

        const createCatalog = new CreateCatalog()
        if (ownerId) createCatalog.execute(ownerId)
      })
    })
  }
}
