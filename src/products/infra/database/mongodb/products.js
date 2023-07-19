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

  async createCatalog(ownerId) {
    return await Products.aggregate([
      {
        $match: {
          ownerId,
        },
      },
      {
        $lookup: {
          from: 'Categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
        },
      },
      {
        $group: {
          _id: '$category._id',
          category_title: {
            $first: '$category.title',
          },
          category_description: {
            $first: '$category.description',
          },
          ownerId: {
            $first: '$ownerId',
          },
          itens: {
            $push: {
              title: '$title',
              description: '$description',
              price: '$price',
            },
          },
        },
      },
      {
        $project: {
          _id: '$ownerId',
          category_title: 1,
          category_description: 1,
          itens: 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          catalog: {
            $push: '$$ROOT',
          },
        },
      },
    ])
  }
}
