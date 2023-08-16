const sequelize = require('sequelize')
const { Category, Product, ProductImage } = require('../models')

const productService = {
  getProducts: async (category, page, sort) => {
    // define display products per page
    const perPage = 9
    // define sorting options
    const sortOptions = {
      price_desc: ['price_regular', 'DESC'],
      price_asc: ['price_regular', 'ASC'],
      date_desc: ['createdAt', 'DESC'],
      date_asc: ['createdAt', 'ASC']
    }
    // get product count
    const productCount = await productService.getProductCount(category)

    const queryOptions = {
      where: {},
      order: [],
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: [
        'id',
        'name',
        'category_id',
        'cover',
        'price_regular',
        'price_sale',
        [sequelize.literal('DATE(Product.created_at)'), 'create_date'],
      ],
      include: {
        model: Category,
        attributes: ['name']
      },
      raw: true,
      nest: true
    }
    if (category) {
      queryOptions.where.category_id = category
    }
    if (sort && sortOptions[sort]) {
      queryOptions.order.push(sortOptions[sort])
    }

    const products = await Product.findAll(queryOptions)
    if (products.length) {
      return {
        status: 'success',
        message: 'products retrieved succeed',
        productCount,
        products
      }
    } else {
      return {
        status: 'success',
        message: 'no products found'
      }
    }
  },

  getProductCount: async (categoryId) => {
    const whereOptions = categoryId ? { category_id: categoryId } : {}
    let totalCount
    totalCount = await Product.count({ where: whereOptions })

    return totalCount
  },

  getProduct: async (id) => {
    const product = await Product.findByPk(id, {
      attributes: [
        'id',
        'name',
        'cover',
        'price_regular',
        'price_sale',
        'description',
        'stock_quantity'
      ],
      include: {
        model: ProductImage,
        attributes: ['name', 'image_path'],
        where: {
          is_display: 1
        },
        required: false
      },
    })
    if (product !== null) {
      return {
        status: 'success',
        message: 'product retrieved succeed',
        product
      }
    } else {
      return {
        status: 'success',
        message: 'no product found'
      }
    }
  },

  getPopularProducts: async (topCount) => {
    // tbc
  }
}

module.exports = productService