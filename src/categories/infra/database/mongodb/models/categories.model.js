import mongoose from 'mongoose'
import { logger } from '../../../../../core/domain/index.js'
const Schema = mongoose.Schema

const CategoriesSchema = new Schema(
  {
    title: { type: String, required: true },
    ownerId: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
    collection: 'Categories',
    versionKey: false,
  },
)

CategoriesSchema.pre('deleteOne', function (next) {
  const categoryId = this.getQuery()['_id']
  const ownerId = this.getQuery()['ownerId']

  mongoose
    .model('Products')
    .updateMany({ ownerId, categoryId }, { $unset: { categoryId: '' } })
    .then(() => {
      next()
    })
    .catch((error) => {
      logger.error(error)
    })
})

CategoriesSchema.index({ title: 1, ownerId: 1 }, { unique: true })

export const Categories = mongoose.model('Categories', CategoriesSchema)
