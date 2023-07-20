import AWS from 'aws-sdk'
import { logger } from '../../domain/index.js'

AWS.config.update({ region: 'us-east-2' })

export class SQSServiceAWS {
  constructor(QueueUrl) {
    this.sqs = new AWS.SQS()
    this.params
    this.QueueUrl = QueueUrl
  }

  async sendRequest(MessageBody) {
    return await this.sqs.sendMessage({ QueueUrl: this.QueueUrl, MessageBody }).promise()
  }

  async receiveMessage(params) {
    try {
      const response = await this.sqs.receiveMessage({ QueueUrl: this.QueueUrl, ...params }).promise()

      if (response.Messages) {
        response.Messages.forEach(({ ReceiptHandle }) => {
          this.sqs.deleteMessage(
            {
              QueueUrl: this.QueueUrl,
              ReceiptHandle,
            },
            (error) => {
              if (error) {
                logger.error(error)
              } else {
                logger.info('Mensagem Deletada')
              }
            },
          )
        })
      }

      return response
    } catch (error) {
      logger.error(error)
    }
  }
}
