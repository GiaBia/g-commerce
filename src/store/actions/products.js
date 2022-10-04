import { errorMessage } from "./message"

export const loadProducts = (products) => {
    return {
        type: 'LOAD_PRODUCTS',
        payload: products
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5001/products')
        const data = await response.json()
        dispatch(loadProducts(data))
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading products'))
    }
}

