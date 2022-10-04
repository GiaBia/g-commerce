const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const mapDbToApiModel = (dbModel) => {
    return dbModel.reduce((acc, cartItem) => {
        let resultCartItem = acc.find(
            (innerCartItem) =>
                innerCartItem.inventoryId === cartItem.inventory_id
        )
        if (!resultCartItem) {
            resultCartItem = {
                itemIds: [],
                name: cartItem.name,
                price: cartItem.price,
                imageUrl: cartItem.image_url,
                size: cartItem.size,
                inventoryId: cartItem.inventory_id,
                quantity: 0,
            }
            acc.push(resultCartItem)
        }

        resultCartItem.itemIds.push(cartItem.id)
        resultCartItem.quantity++
        return acc
    }, [])
}

module.exports = {
    getShoppingCart: async (userId) => {
        return db
            .query(
                `
        SELECT cart.id, products.name, products.price, products.image_url, product_inventory.size, product_inventory.id AS inventory_id
        FROM public.cart
        inner join product_inventory on cart.inventory_id=product_inventory.id
       inner join products on product_inventory.product_id= products.id   
        where cart.user_id = '${userId}'
		`,
                { type: Sequelize.QueryTypes.SELECT }
            )
            .then(mapDbToApiModel)
    },

    deleteCart: async (userId) => {
        return db.query(
            `
        delete from cart
        where '${userId}' = user_id
        `,
            { type: Sequelize.QueryTypes.DELETE }
        )
    },
}
