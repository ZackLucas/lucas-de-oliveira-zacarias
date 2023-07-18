import { faker } from '@faker-js/faker'

import { Categories } from '../../infra/index.js'
import { ObjectId } from 'mongodb'

export class CategoriesMock {
  constructor() {
    const category = this.generate()

    this._id = category._id
    this.ownerId = category.ownerId
    this.title = category.title
    this.description = category.description
  }

  static create() {
    return new CategoriesMock()
  }

  get category() {
    return this
  }

  generate() {
    return {
      _id: new ObjectId(),
      ownerId: new ObjectId(),
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
    }
  }

  async persist(ownerId = this.ownerId) {
    const { title, description } = this
    return await Categories.create({ ownerId, title, description })
  }
}
