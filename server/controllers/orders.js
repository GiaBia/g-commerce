const { request } = require("express");
const { Sequelize } = require("sequelize");
const db = require('../lib/db');
const { getShoppingCart, deleteCart } = require("./helpers");

const checkInventory = async (inventoryId, desiredQuantity) => {
    const hasEnoughInventory = await db.query(`
    SELECT quantity FROM product_inventory
    WHERE id = ${inventoryId}
    `, { type: Sequelize.QueryTypes.SELECT }).then(dbRes => {
        return dbRes[0] && dbRes[0].quantity >= desiredQuantity
    })

    console.log(!!hasEnoughInventory, hasEnoughInventory)
    return !!hasEnoughInventory
}

const reduceInventory = async (inventoryId, desiredQuantity) => {
    await db.query(`
     UPDATE product_inventory
    SET quantity = quantity - ${desiredQuantity}
     WHERE id = ${inventoryId}
     `, { type: Sequelize.QueryTypes.UPDATE })
}

const getOrderPrices = (cartItems) => {
    const subtotal = cartItems.reduce((subtotal, item) => {
        return (subtotal + item.price) * item.quantity
    }, 0)
    return {
        subtotal,
        total: subtotal + (subtotal * .06),
        tax: (subtotal * .06)
    }
}

const createOrder = async (userId, cartItems) => {
    const prices = getOrderPrices(cartItems)

    const orderResult = await db.query(`
    INSERT INTO public.orders(
        subtotal, user_id, created_at, total, tax)
        VALUES (  ${prices.subtotal}, '${userId}', now(), ${prices.total}, ${prices.tax});
    SELECT MAX(ID) FROM public.orders;
    `, { type: Sequelize.QueryTypes.SELECT })

    await db.query(`
    INSERT INTO public.order_products_mapping(
        order_id, product_inventory_id, quantity, price)
        VALUES ${cartItems.reduce((values, item) => {
        values.push(`(${orderResult[0].max}, ${item.inventoryId}, ${item.quantity}, ${item.price})`)
        return values
    }, []).join(',')}
    `, { type: Sequelize.QueryTypes.INSERT })

}

const mapDbToApiModel = (dbModel) => {
    return dbModel.reduce((acc, order) => {
        let resultOrder = acc.find(innerOrder => innerOrder.id === order.id)
        if (!resultOrder) {
            resultOrder = {
                id: order.id,
                createdAt: order.created_at,
                subtotal: order.subtotal,
                tax: order.tax,
                total: order.total,
                items: [],
            }
            acc.push(resultOrder)
        }

        resultOrder.items.push({
            price: order.price,
            imageUrl: order.image_url,
            name: order.name,
            size: order.size,
            quantity: order.quantity,
            productId: order.product_id,
            inventoryId: order.inventory_id,
        })

        return acc
    }, [])
}

module.exports = {
    createOrder: async (req, res) => {
        try {
            const userId = req.authenticatedUser.uid

            const shoppingCart = await getShoppingCart(userId)

            for (let i = 0; i < shoppingCart.length; i++) {
                if (!(await checkInventory(shoppingCart[i].inventoryId, shoppingCart[i].quantity))) {
                    res.status(500).send('Not enough inventory')
                    return
                }
            }

            for (let i = 0; i < shoppingCart.length; i++) {
                await reduceInventory(shoppingCart[i].inventoryId, shoppingCart[i].quantity)
            }

            await createOrder(userId, shoppingCart)

            await deleteCart(userId)

            res.status(200).send(shoppingCart)
        } catch (err) {
            console.log('error', err)
            res.sendStatus(500)
        }
    },

    getOrderHistory: (req, res) => {
        const userId = req.authenticatedUser.uid
        db.query(`
            SELECT 
              order_products_mapping.price
            , image_url
            , name
            , size
            , order_products_mapping.quantity
            , products.id AS product_id
            , product_inventory.id AS inventory_id
            , orders.id
            , orders.created_at
            , orders.subtotal
            , orders.tax
            , orders.total 
            FROM orders
            inner join order_products_mapping on order_products_mapping.order_id = orders.id
            inner join product_inventory on product_inventory.id = order_products_mapping.product_inventory_id
            inner join products on products.id = product_inventory.product_id
            WHERE '${userId}' = orders.user_id
        `, { type: Sequelize.QueryTypes.SELECT }).then(dbRes => {
            const resBody = mapDbToApiModel(dbRes)
            res.status(200).send(resBody)
        }).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

}


