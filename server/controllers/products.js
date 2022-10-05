const { request } = require('express')
const { Sequelize } = require('sequelize')
const db = require('../lib/db')

const mapDbToApiModel = (dbModel) => {
    return dbModel.reduce((acc, product) => {
        let resultProduct = acc.find(
            (innerProduct) => innerProduct.id === product.id
        )
        if (!resultProduct) {
            resultProduct = {
                id: product.id,
                price: product.price,
                imageUrl: product.image_url,
                name: product.name,
                description: product.description,
                inventory: [],
            }
            acc.push(resultProduct)
        }

        resultProduct.inventory.push({
            size: product.size,
            quantity: product.quantity,
            id: product.inventory_id,
        })
        return acc
    }, [])
}

module.exports = {
    getProducts: (req, res) => {
        db.query(
            `
            SELECT price, image_url, name, description, size, quantity, products.id, product_inventory.id AS inventory_id 
            FROM products
            inner join product_inventory on product_inventory.product_id = products.id
		`,
            { type: Sequelize.QueryTypes.SELECT }
        )
            .then((dbRes) => {
                const resBody = mapDbToApiModel(dbRes)
                res.status(200).send(resBody)
            })
            .catch((err) => {
                console.log('error', err)
                res.sendStatus(500)
            })
    },

    getProduct: (req, res) => {
        const { id } = req.params
        db.query(
            `
        SELECT price, image_url, name, description, size, quantity, products.id, product_inventory.id AS inventory_id
        FROM products
        inner join product_inventory on product_inventory.product_id = products.id
        WHERE ${id} = products.id
		`,
            { type: Sequelize.QueryTypes.SELECT }
        )
            .then((dbRes) => {
                if (dbRes[0].length === 0) {
                    res.sendStatus(404)
                } else {
                    const resBody = mapDbToApiModel(dbRes)
                    res.status(200).send(resBody[0])
                }
            })
            .catch((err) => {
                console.log('error', err)
                res.sendStatus(500)
            })
    },
}
