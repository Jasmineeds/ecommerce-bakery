const productService = require('../services/productService')
const { CError } = require('../middleware/error-handler')

const productController = {

  getProducts: async (req, res, next) => {
    try {
      let { category, page, sort } = req.query
      // page should be at least 1
      page = page >= 1 ? page : 1

      const { status, message, products } = await productService.getProducts(category, page, sort)
      res.json({ status, message, products })
    } catch (error) {
      next(error)
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const { id } = req.params
      const idPattern = /^[1-9]\d*$/
      if (!id || !idPattern.test(id)) throw new CError('invalid product id', 400)

      const { status, message, product } = await productService.getProduct(id)
      res.json({ status, message, product })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = productController