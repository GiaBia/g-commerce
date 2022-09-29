const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");


const { createOrder, getOrderHistory } = require('./controllers/orders')
const { getProducts, getProduct } = require('./controllers/products')
const { getShoppingCart, addToCart, removeFromCart } = require('./controllers/cart')
app.use(cors());

app.use(express.json());

app.get('/orders', getOrderHistory)
app.post('/orders', createOrder)
app.get('/products', getProducts)
app.get('/products/:id', getProduct)
app.get('/cart', getShoppingCart)
app.delete('/cart/:id', removeFromCart)
app.post('/cart', addToCart)

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

