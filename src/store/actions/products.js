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

        if (response.status === 200) {
            const data = await response.json()
            dispatch(loadProducts(data))
        } else {
            dispatch(errorMessage(`Error loading products: ${response.statusText}`))
        }
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading products'))
    }
}

