const { Sequelize } = require("sequelize");
const db = require('../lib/db')


module.exports = {
    getShoppingCart: async (userId) => {
        return db.query(`
        SELECT cart.id, products.name, products.price, products.image_url, product_inventory.size, product_inventory.id AS inventory_id
        FROM public.cart
        inner join product_inventory on cart.inventory_id=product_inventory.id
       inner join products on product_inventory.product_id= products.id   
        where cart.user_id = '${userId}'
		`, { type: Sequelize.QueryTypes.SELECT })

    }
}