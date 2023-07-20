import AWS from 'aws-sdk'

import { SendCatalogMessage } from '../../data/index.js'

jest.mock('aws-sdk', () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn().mockReturnValue([]),
  }
  return {
    config: {
      update: jest.fn(),
    },
    SQS: jest.fn(() => SQSMocked),
  }
})

jest.mock('aws-sdk', () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    receiveMessage: jest.fn().mockReturnThis(),
    deleteMessage: jest.fn().mockReturnThis(),
    promise: jest.fn().mockReturnValue([]),
  }
  return {
    config: {
      update: jest.fn(),
    },
    SQS: jest.fn(() => SQSMocked),
  }
})

const sqs = new AWS.SQS({
  region: 'us-east-1',
})

describe('Use Cases -> Core -> Catalog Send Message', () => {
  it('Should be able send message', async () => {
    const instance = new SendCatalogMessage()

    sqs.sendMessage().promise.mockReturnValue([{ test: 'test' }])
    const response = await instance.execute()

    expect(response).toStrictEqual([{ test: 'test' }])
  })
})
