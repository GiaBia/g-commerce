const { request } = require("express");
const { Sequelize } = require("sequelize");
const db = require('../lib/db')
const { getShoppingCart } = require('./helpers')

module.exports = {
    getShoppingCart: (req, res) => {
        const userId = req.authenticatedUser.uid

        getShoppingCart(userId).then(cart => {
            res.status(200).send(cart)
        }).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

    addToCart: (req, res) => {
        const userId = req.authenticatedUser.uid

        const { inventoryId } = req.body;
        db.query(`
        INSERT INTO public.cart(
            inventory_id, user_id)
           VALUES (  ${inventoryId}, '${userId}');
        `, { type: Sequelize.QueryTypes.INSERT }).then(dbRes => res.status(200).send(dbRes)).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    },

    removeFromCart: (req, res) => {
        const userId = req.authenticatedUser.uid
        const { id } = req.params;
        db.query(`
        delete from cart
        where ${id} = id and ${userId} = user_id
        `, { type: Sequelize.QueryTypes.DELETE }).then(dbRes => res.status(200).send(dbRes)).catch(err => {
            console.log('error', err)
            res.sendStatus(500)
        })
    }
}