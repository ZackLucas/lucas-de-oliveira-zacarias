import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categoriesSchema = new Schema(
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

categoriesSchema.index({ title: 1, ownerId: 1 }, { unique: true })

export const Categories = mongoose.model('Categories', categoriesSchema)
