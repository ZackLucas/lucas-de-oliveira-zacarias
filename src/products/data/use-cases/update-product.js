import { ProductsDatabase } from '../../infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { ObjectId } from 'mongodb'
import { verifyCategory } from '../utils/verify-category.js'

export class UpdateProducts {
  async execute(ownerId, productId, payload) {
    this.validateEntries(ownerId, productId, payload)

    if (payload.categoryId) await verifyCategory(ownerId, payload.categoryId)

    const productsDatabase = new ProductsDatabase()
    const { modifiedCount } = await productsDatabase.update(ownerId, productId, payload)

    if (modifiedCount === 0) throw new BadRequestError(null, 'No information has been updated.')

    return { modifiedCount }
  }

  validateEntries(ownerId, productId, { title, price, categoryId }) {
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!price) throw new ValidationError(null, 'price is required.')
    if (!Number(price)) throw new ValidationError(null, 'price is not valid.')
    if (!ObjectId.isValid(productId)) throw new ValidationError(null, 'productId is not valid.')

    if (categoryId && !ObjectId.isValid(categoryId)) throw new ValidationError(null, 'categoryId is not valid.')
  }
}
