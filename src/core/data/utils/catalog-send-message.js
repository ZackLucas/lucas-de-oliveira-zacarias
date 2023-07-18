import { SQSServiceAWS } from '../../infra/index.js'

export class SendCatalogMessage {
  constructor() {}

  async execute(ownerId) {
    const sqsServiceAWS = new SQSServiceAWS(process.env.AWS_QUEUE_URL)

    return sqsServiceAWS.sendRequest(JSON.stringify({ ownerId }), 'catalog')
  }
}
