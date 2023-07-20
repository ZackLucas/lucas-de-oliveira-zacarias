import { BadRequestError } from '../../../../core/domain/index.js'

import { Products } from './index.js'

export class ProductsDatabase {
  async findOneById(ownerId, productId) {
    const user = await Products.findOne({ ownerId, _id: productId })

    return user
  }

  async findByCategoryId(categoryId) {
    return await Products.find({ categoryId }).lean()
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

  async findCatalogByOwnerId(ownerId) {
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
        $group: {
          _id: '$ownerId',
          catalog: {
            $push: {
              category_title: '$category_title',
              category_description: '$category_description',
              itens: '$itens',
            },
          },
        },
      },
    ])
  }
}
