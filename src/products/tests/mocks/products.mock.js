import { faker } from '@faker-js/faker'

import { Products } from '../../infra/index.js'
import { ObjectId } from 'mongodb'

export class ProductsMock {
  constructor(categoryId, ownerId) {
    const products = this.generate()

    this._id = products._id
    this.ownerId = ownerId || products.ownerId
    this.title = products.title
    this.description = products.description
    this.price = products.price
    this.categoryId = categoryId
  }

  static create(categoryId, ownerId) {
    return new ProductsMock(categoryId, ownerId)
  }

  get product() {
    return this
  }

  get productWithoutId() {
    delete this._id
    return this
  }

  generate() {
    return {
      _id: new ObjectId(),
      ownerId: new ObjectId(),
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ max: 50 }),
    }
  }

  async persist(ownerId = this.ownerId) {
    const { title, description, price, categoryId, _id } = this
    await Products.create({ ownerId, _id, title, description, price, categoryId })
    return this
  }
}
