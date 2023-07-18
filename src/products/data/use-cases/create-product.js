import { ProductsDatabase } from '../../infra/index.js'
import { CategoriesDatabase } from '../../../categories/infra/index.js'

import { BadRequestError } from '../../../core/domain/errors/bad-request-error.js'
import { ValidationError } from '../../../core/domain/errors/validation.error.js'
import { ObjectId } from 'mongodb'

export class CreateProducts {
  async execute(ownerId, payload) {
    this.validateEntries(ownerId, payload)
    await this.verifyCategory(ownerId, payload.categoryId)

    const productsDatabase = new ProductsDatabase()
    const product = await productsDatabase.create(ownerId, payload)

    if (!product) throw new BadRequestError(null, 'category not registered.')

    return product
  }

  validateEntries(ownerId, { title, price, categoryId }) {
    if (!ownerId) throw new ValidationError(null, 'ownerId is required.')
    if (!title) throw new ValidationError(null, 'title is required.')
    if (!price) throw new ValidationError(null, 'price is required.')
    if (!categoryId) throw new ValidationError(null, 'categoryId is required.')
    if (!ObjectId.isValid(categoryId)) throw new ValidationError(null, 'categoryId is not valid.')
  }

  async verifyCategory(ownerId, categoryId) {
    const categoriesDatabase = new CategoriesDatabase()

    const category = await categoriesDatabase.findOneById(ownerId, categoryId)

    if (!category) throw new BadRequestError(null, 'Category not found or not exists.')
  }
}
