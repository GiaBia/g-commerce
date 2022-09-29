const { request } = require("express");
const db = require('../lib/db')

const mapDbToApiModel = (dbModel) => {
    return dbModel.map((cartItem) => {
        return {
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            imageUrl: cartItem.image_url,
            size: cartItem.size,
            inventoryId: cartItem.inventory_id,
        }
    })
}

module.exports = {
    getShoppingCart: (req, res) => {
        //TODO: need to use userId from Firebase auth 
        db.query(`
        SELECT cart.id, products.name, products.price, products.image_url, product_inventory.size, product_inventory.id AS inventory_id
        FROM public.cart
        inner join product_inventory on cart.inventory_id=product_inventory.id
       inner join products on product_inventory.product_id= products.id  
        where cart.user_id = 'dean'
		`).then(dbRes => {
            const resBody = mapDbToApiModel(dbRes[0])
            res.status(200).send(resBody)
        }).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

    addToCart: (req, res) => {
        const { inventoryId } = req.body;
        db.query(`
        INSERT INTO public.cart(
            inventory_id, user_id)
           VALUES (  ${inventoryId}, 'dean');
        `).then(dbRes => res.status(200).send(dbRes[0])).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    }
    ,

    removeFromCart: (req, res) => {
        const { id } = req.params;
        db.query(`
        delete from cart
        where ${id} = id
        `).then(dbRes => res.status(200).send(dbRes[0])).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    }



}