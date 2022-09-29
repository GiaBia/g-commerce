const { request } = require("express");
const db = require('../lib/db')


module.exports = {
    createOrder: () => {

    },

    getOrderHistory: (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    },

}


