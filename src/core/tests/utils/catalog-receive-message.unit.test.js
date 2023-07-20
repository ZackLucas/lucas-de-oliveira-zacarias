import AWS from 'aws-sdk'

import { ReceiveCatalogMessage } from '../../data/index.js'

import { ReceiveMessageMock } from '../mocks/receive-message.mock.js'

jest.mock('aws-sdk', () => {
  const SQSMocked = {
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

describe('Use Cases -> Core -> Catalog Receive Message', () => {
  it('Should be able receive message', async () => {
    const instance = new ReceiveCatalogMessage()
    const mock = ReceiveMessageMock.create().Message

    sqs.receiveMessage().promise.mockReturnValue(mock)
    const response = await instance.execute()

    expect(response).toStrictEqual(mock)
  })
})
