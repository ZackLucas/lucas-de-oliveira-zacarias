import { SQSServiceAWS } from '../../infra/index.js'

export class SendCatalogMessage {
  constructor() {}

  async execute(ownerId) {
    try {
      const sqsServiceAWS = new SQSServiceAWS(process.env.AWS_QUEUE_URL)

      const result = await sqsServiceAWS.sendRequest(JSON.stringify({ ownerId }))
      console.log(result)

      return result
    } catch (error) {
      console.error(error)
    }
  }
}
