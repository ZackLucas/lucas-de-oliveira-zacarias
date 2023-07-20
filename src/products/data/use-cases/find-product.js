import { RequiredParamError } from '../../../core/domain/index.js'

import { ProductsDatabase } from '../../infra/index.js'

export class FindProducts {
  async execute(ownerId) {
    this.validateEntries(ownerId)

    const productsDatabase = new ProductsDatabase()
    const product = await productsDatabase.findAllByOwnerId(ownerId)

    return product
  }

  validateEntries(ownerId) {
    if (!ownerId) throw new RequiredParamError('ownerId')
  }
}
