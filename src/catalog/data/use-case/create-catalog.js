import { ProductsDatabase } from '../../../products/infra/index.js'
import { S3ServiceAWS } from '../../../core/infra/index.js'

export class CreateCatalog {
  async execute(ownerId) {
    const productDatabase = new ProductsDatabase()

    const [{ _id, catalog }] = await productDatabase.createCatalog(ownerId)

    await this.sendCatalogToS3({ owner: _id, catalog })
  }

  async sendCatalogToS3(catalog) {
    const s3Service = new S3ServiceAWS()
    const Bucket = process.env.AWS_BUCKET

    const { owner } = catalog

    const params = s3Service.jsonToS3(catalog, Bucket, `${owner}/catalog.json`)

    await s3Service.uploadFile(params)
  }
}
