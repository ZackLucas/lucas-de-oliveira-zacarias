import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' })

export class SQSServiceAWS {
  constructor(QueueUrl) {
    this.sqs = new AWS.SQS()
    this.params
    this.QueueUrl = QueueUrl
  }

  async sendRequest(MessageBody, MessageGroupId) {
    return this.sqs.sendMessage({ QueueUrl: this.QueueUrl, MessageBody, MessageGroupId }).promise()
  }

  async receiveMessage(params) {
    return this.sqs.receiveMessage({ QueueUrl: this.QueueUrl, ...params }).promise()
  }
}
