require('dotenv').config()

const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

module.exports = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {},
})
