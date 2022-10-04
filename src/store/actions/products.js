import { errorMessage } from "./message"
import { auth } from '../../firebase-config'

export const loadProducts = (products) => {
    return {
        type: 'LOAD_PRODUCTS',
        payload: products
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        // const authToken = await auth.currentUser.getIdToken()
        // {
        //     headers: { Authorization: `Bearer ${authToken}` }
        // }
        const response = await fetch('http://localhost:5001/products')

        const data = await response.json()

        if (response.status === 200) {
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

