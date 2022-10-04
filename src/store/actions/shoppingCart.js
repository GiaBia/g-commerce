import { successMessage, errorMessage } from "./message"
import { auth } from '../../firebase-config'

export const addProductToCart = (inventoryId, productName) => async (dispatch) => {
    try {
        console.log(inventoryId)
        const authToken = await auth.currentUser.getIdToken()
        const response = await fetch('http://localhost:5001/cart', {
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ inventoryId })
        })
        if (response.status === 200) {
            dispatch(getCart())
            dispatch(successMessage(`${productName} added to cart!`))
        } else {
            dispatch(errorMessage(`Error adding to cart: ${response.statusText} `))
        }
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error adding to cart'))
    }
}

export const removeProductFromCart = (inventoryId, productName) => async (dispatch) => {
    try {
        const authToken = await auth.currentUser.getIdToken()
        const response = await fetch(`http://localhost:5001/cart/${inventoryId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            method: 'DELETE',
        })
        if (response.status === 200) {
            dispatch(getCart())
            dispatch(successMessage(`${productName} removed from cart!`))
        } else {
            dispatch(errorMessage(`Error removing from cart: ${response.statusText}`))
        }
    } catch (err) {
        console.log(err)
        dispatch(errorMessage('Error removing from cart'))
    }
}

export const loadCart = (cart) => {
    return {
        type: 'LOAD_CART',
        payload: cart
    }
}

export const getCart = () => async (dispatch) => {
    try {
        const authToken = await auth.currentUser.getIdToken()
        const response = await fetch('http://localhost:5001/cart', {
            headers: { Authorization: `Bearer ${authToken}` }
        })

        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            dispatch(loadCart(data))
        } else {
            dispatch(errorMessage(`Error loading cart: ${response.statusText}`))
        }
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading cart'))
    }
}