import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categoriesSchema = new Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
    collection: 'Categories',
    versionKey: false,
  },
)

categoriesSchema.index({ title: 1, owner: 1 }, { unique: true })

const Categories = mongoose.model('Categories', categoriesSchema)

export default Categories
