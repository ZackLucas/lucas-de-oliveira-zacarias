import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' })

export class S3ServiceAWS {
  constructor() {
    this.sqs = new AWS.SQS()
  }

  async uploadFile(params) {
    const s3 = new AWS.S3({ region: process.env.AWS_REGION })

    const data = await s3.upload(params).promise()
    return data.Location
  }

  jsonToS3(payload, Bucket, Key) {
    const Body = Buffer.from(JSON.stringify(payload))
    return {
      Bucket,
      Key: Key,
      Body,
      ContentEncoding: 'base64',
      ContentType: 'Application/json',
      ACL: 'public-read',
    }
  }
}
