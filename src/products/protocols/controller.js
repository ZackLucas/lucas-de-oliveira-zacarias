import { CreateProducts, UpdateProducts, DeleteProducts } from '../data/index.js'

import { SendCatalogMessage } from '../../core/data/index.js'

export default class ProductsController {
  async createProducts(req, res) {
    try {
      const { ownerId } = req.params
      const useCase = new CreateProducts()

      const response = await useCase.execute(ownerId, req.body)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }

  async updateProducts(req, res) {
    try {
      const { ownerId, productId } = req.params
      const useCase = new UpdateProducts()

      const response = await useCase.execute(ownerId, productId, req.body)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }

  async deleteProducts(req, res) {
    try {
      const { ownerId, productId } = req.params
      const useCase = new DeleteProducts()

      const response = await useCase.execute(ownerId, productId)

      await new SendCatalogMessage().execute(ownerId)

      return res.json({ data: response })
    } catch (error) {
      const message = error.message || 'Error'
      const status = error.status || 400

      res.status(status || 400).send({ message, status })
    }
  }
}
