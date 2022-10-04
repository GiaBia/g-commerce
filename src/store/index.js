import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './reducers/products'
import { ordersReducer } from './reducers/orders'
import { shoppingCartReducer } from './reducers/shoppingCart'
import { userReducer } from './reducers/user'
import { messageReducer } from './reducers/message'

const store = configureStore({
    reducer: {
        products: productsReducer,
        shoppingCart: shoppingCartReducer,
        orders: ordersReducer,
        user: userReducer,
        message: messageReducer,
    },
})
//this now creates our store

export default store
