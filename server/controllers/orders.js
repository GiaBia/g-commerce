const { request } = require("express");
const { Sequelize } = require("sequelize");
const db = require('../lib/db')

const checkInventory = (inventoryId) => {
    db.query(`
    SELECT quantity FROM product_inventory
    WHERE id = ${inventoryId}
    `, { type: Sequelize.QueryTypes.SELECT }).then(dbRes => dbRes)

}
// {
//     items:
// }
//1.) check inventory 2.)reduce inventory by x amount 3.) Add an order 4.)Add products to the order mapping table 
module.exports = {
    createOrder: (req, res) => {
        const { inventoryId } = req.body;
        db.query(`
        INSERT INTO public.cart(
            inventory_id, user_id)
           VALUES (  ${inventoryId}, 'dean');
        `, { type: Sequelize.QueryTypes.INSERT }).then(dbRes => res.status(200).send(dbRes[0])).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

    getOrderHistory: (req, res) => {
        db.query(`
            SELECT price
            , image_url
            , name
            , size
            , quantity
            , products.id AS product_id
            , product_inventory.id AS inventory_id
            , orders.id AS order_id, orders.created_at
            , orders.subtotal
            , orders.tax
            , orders.total 
            FROM orders
            inner join order_products_mapping on order_products_mapping.order_id = orders.id
            inner join product_inventory on product_inventory.id = order_products_mapping.product_inventory_id
            inner join products on products.id = product_inventory.product_id
            WHERE ${userId} = orders.user_id            
		`).then(dbRes => {
            const resBody = mapDbToApiModel(dbRes[0])
            res.status(200).send(resBody)
        }).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

}


