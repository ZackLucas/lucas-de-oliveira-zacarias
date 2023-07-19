import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' })

export class SQSServiceAWS {
  constructor(QueueUrl) {
    this.sqs = new AWS.SQS()
    this.params
    this.QueueUrl = QueueUrl
  }

  async sendRequest(MessageBody) {
    return this.sqs.sendMessage({ QueueUrl: this.QueueUrl, MessageBody }).promise()
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
                console.error(error)
              } else {
                console.log('Deletado com sucesso')
              }
            },
          )
        })
      }

      return response
    } catch (error) {
      console.error(error)
    }
  }
}
