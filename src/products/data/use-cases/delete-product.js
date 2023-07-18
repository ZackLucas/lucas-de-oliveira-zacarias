import { ProductsDatabase } from '../../infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { ObjectId } from 'mongodb'

export class DeleteProducts {
  async execute(ownerId, productId) {
    this.validateEntries(ownerId, productId)

    const productsDatabase = new ProductsDatabase()
    const { deletedCount } = await productsDatabase.delete(ownerId, productId)

    if (deletedCount === 0) throw new BadRequestError(null, 'Product not deleted.')

    return { deletedCount }
  }

  validateEntries(ownerId, productId) {
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
    if (!ObjectId.isValid(productId)) throw new ValidationError(null, 'productId is not valid.')
  }
}
