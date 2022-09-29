const { request } = require("express");
const { Sequelize } = require("sequelize");
const db = require('../lib/db')
const { getShoppingCart } = require('./helpers')

const mapDbToApiModel = (dbModel) => {
    return dbModel.reduce((acc, cartItem) => {
        let resultCartItem = acc.find(innerCartItem => innerCartItem.inventoryId === cartItem.inventory_id)
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
    getShoppingCart: (req, res) => {
        //TODO: need to use userId from Firebase auth 
        getShoppingCart('dean').then(dbRes => {
            const resBody = mapDbToApiModel(dbRes)
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
        `, { type: Sequelize.QueryTypes.INSERT }).then(dbRes => res.status(200).send(dbRes)).catch(err => {
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
        `, { type: Sequelize.QueryTypes.DELETE }).then(dbRes => res.status(200).send(dbRes)).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    }
}