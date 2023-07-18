import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductsSchema = new Schema(
  {
    ownerId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    categoryId: { ref: 'Categories', type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    collection: 'Products',
    versionKey: false,
  },
)

ProductsSchema.index({ title: -1, ownerId: 1 }, { unique: true })

export const Products = mongoose.model('Products', ProductsSchema)
