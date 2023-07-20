import { ProductsDatabase } from '../../../products/infra/index.js'
import { S3ServiceAWS } from '../../../core/infra/index.js'

export class CreateCatalog {
  async execute(ownerId) {
    const productDatabase = new ProductsDatabase()

    const [response] = await productDatabase.createCatalog(ownerId)

    if (!response) return await this.sendCatalogToS3({ owner: ownerId, catalog: [] })

    const { catalog } = response
    await this.sendCatalogToS3({ owner: ownerId, catalog })
  }

  async sendCatalogToS3(payload) {
    const s3Service = new S3ServiceAWS()
    const Bucket = process.env.AWS_BUCKET

    const { owner } = payload

    const params = s3Service.jsonToS3(payload, Bucket, `${owner}/catalog.json`)

    await s3Service.uploadFile(params)
  }
}
