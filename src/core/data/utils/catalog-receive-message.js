import { logger } from '../../domain/index.js'
import { SQSServiceAWS } from '../../infra/index.js'

export class ReceiveCatalogMessage {
  async execute() {
    try {
      const sqsServiceAWS = new SQSServiceAWS(process.env.AWS_QUEUE_URL)

      return await sqsServiceAWS.receiveMessage({ AttributeNames: ['All'], WaitTimeSeconds: 0 })
    } catch (error) {
      logger.error(error)
    }
  }

  getBody(message) {
    const messageBody = JSON.parse(message.Body)

    return messageBody
  }
}
