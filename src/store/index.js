
import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './reducers/products'
import { ordersReducer } from './reducers/orders'
import { shoppingCartReducer } from './reducers/shoppingCart'
import { userReducer } from './reducers/user'

const store = configureStore({
    reducer: {
        products: productsReducer,
        shoppingCart: shoppingCartReducer,
        orders: ordersReducer,
        user: userReducer
    }
})
//this now creates our store 

export default store;
