import { SQSServiceAWS } from '../../infra/index.js'
import { logger } from '../../domain/index.js'

export class SendCatalogMessage {
  constructor() {}

  async execute(ownerId) {
    try {
      const sqsServiceAWS = new SQSServiceAWS(process.env.AWS_QUEUE_URL)

      const result = await sqsServiceAWS.sendRequest(JSON.stringify({ ownerId }))

      return result
    } catch (error) {
      logger.error(error)
    }
  }
}
