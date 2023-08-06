// PENDING: price_each

'use strict'
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const carts = await queryInterface.sequelize.query(
      'SELECT id FROM Carts;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('CartItems',
      Array.from({ length: 15 }, () => ({
        cart_id: carts[Math.floor(Math.random() * carts.length)].id,
        product_id: products[Math.floor(Math.random() * products.length)].id,
        quantity: faker.number.int({ min: 1, max: 4 }),
        created_at: new Date(),
        updated_at: new Date(),
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CartItems', {})
  }
}