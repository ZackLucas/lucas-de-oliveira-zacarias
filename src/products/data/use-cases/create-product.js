import { ProductsDatabase } from '../../infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { ObjectId } from 'mongodb'
import { verifyCategory } from '../utils/verify-category.js'

export class CreateProducts {
  async execute(ownerId, payload) {
    this.validateEntries(ownerId, payload)

    if (payload.categoryId) await verifyCategory(ownerId, payload.categoryId)

    const productsDatabase = new ProductsDatabase()
    const product = await productsDatabase.create(ownerId, payload)

    if (!product) throw new BadRequestError(null, 'category not registered.')

    return product
  }

  validateEntries(ownerId, { title, price, categoryId }) {
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!price) throw new ValidationError(null, 'price is required.')

    if (categoryId && !ObjectId.isValid(categoryId)) throw new ValidationError(null, 'categoryId is not valid.')
  }
}
