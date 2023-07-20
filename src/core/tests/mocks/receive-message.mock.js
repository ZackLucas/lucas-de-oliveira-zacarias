import { faker } from '@faker-js/faker'

import { ObjectId } from 'mongodb'

export class ReceiveMessageMock {
  constructor() {
    const data = this.generate()

    this.Message = {
      ResponseMetadata: { RequestId: data.RequestId },
      Messages: [
        {
          MessageId: data.MessageId,
          ReceiptHandle: data.ReceiptHandle,
          MD5OfBody: data.MD5OfBody,
          Body: data.Body,
          Attributes: data.Attributes,
        },
      ],
    }
  }

  static create() {
    return new ReceiveMessageMock()
  }

  generate() {
    return {
      RequestId: faker.string.uuid(),
      MessageId: faker.string.uuid(),
      ReceiptHandle: faker.string.nanoid(120),
      MD5OfBody: faker.string.alphanumeric(30),
      Body: `{"ownerId":${new ObjectId()}}`,
      Attributes: [],
    }
  }
}
