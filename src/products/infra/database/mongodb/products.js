import { BadRequestError } from '../../../../core/domain/errors/bad-request-error.js'
import { Products } from './index.js'

export class ProductsDatabase {
  async findOneById(ownerId, productId) {
    const user = await Products.findOne({ ownerId, _id: productId })

    return user
  }

  async create(ownerId, payload) {
    try {
      const user = await Products.create({ ownerId, ...payload })

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Product is already exists.')
      throw new Error(error)
    }
  }

  async update(ownerId, productId, payload) {
    try {
      const user = await Products.updateOne({ ownerId, _id: productId }, payload)

      return user
    } catch (error) {
      if (error.code === 11000) throw new BadRequestError(null, 'Product is already exists.')
      throw new Error(error)
    }
  }

  async delete(ownerId, productId) {
    const user = await Products.deleteOne({ ownerId, _id: productId })

    return user
  }
}
