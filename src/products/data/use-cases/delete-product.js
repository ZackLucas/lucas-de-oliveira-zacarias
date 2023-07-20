import { ObjectId } from 'mongodb'

import { BadRequestError, RequiredParamError } from '../../../core/domain/index.js'

import { ProductsDatabase } from '../../infra/index.js'

export class DeleteProducts {
  async execute(ownerId, productId) {
    this.validateEntries(ownerId, productId)

    const productsDatabase = new ProductsDatabase()
    const { deletedCount } = await productsDatabase.delete(ownerId, productId)

    if (deletedCount === 0) throw new BadRequestError(null, 'Product not deleted.')

    return { deletedCount }
  }

  validateEntries(ownerId, productId) {
    if (!ownerId) throw new RequiredParamError('ownerId')
    if (!ObjectId.isValid(productId)) throw new RequiredParamError(null, 'productId is not valid.')
  }
}
