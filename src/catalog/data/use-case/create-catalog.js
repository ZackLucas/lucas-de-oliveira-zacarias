import { ProductsDatabase } from '../../../products/infra/index.js'

export class CreateCatalog {
  async execute(ownerId) {
    const productDatabase = new ProductsDatabase()

    const [{ _id, catalog }] = await productDatabase.createCatalog(ownerId)

    this.sendCatalogToS3({ owner: _id, catalog })
  }

  sendCatalogToS3(catalog) {
    console.log(catalog)
  }
}
