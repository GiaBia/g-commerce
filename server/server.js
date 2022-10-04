const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = require("./secrets/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://g-commerce-31593-default-rtdb.firebaseio.com"
});
const { getAuth } = require("firebase-admin/auth");
const firebaseAuth = getAuth();
const authMiddleWare = require("firebase-auth-express-middleware");

const { createOrder, getOrderHistory } = require('./controllers/orders')
const { getProducts, getProduct } = require('./controllers/products')
const { getShoppingCart, addToCart, removeFromCart } = require('./controllers/cart')
app.use(cors());
app.use(express.json());

app.get('/products', getProducts)
app.get('/products/:id', getProduct)
app.get('/orders', authMiddleWare.authn(firebaseAuth), getOrderHistory)
app.post('/orders', authMiddleWare.authn(firebaseAuth), createOrder)
app.get('/cart', authMiddleWare.authn(firebaseAuth), getShoppingCart)
app.delete('/cart/:id', authMiddleWare.authn(firebaseAuth), removeFromCart)
app.post('/cart', authMiddleWare.authn(firebaseAuth), addToCart)

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

