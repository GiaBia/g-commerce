import { errorMessage } from './message'
import { auth } from '../../firebase-config'
import { getCart } from './shoppingCart'

export const loadOrders = (orders) => {
    return {
        type: 'LOAD_ORDERS',
        payload: orders,
    }
}

export const getOrders = () => async (dispatch) => {
    try {
        const authToken = await auth.currentUser.getIdToken()
        const response = await fetch('http://localhost:5001/orders', {
            headers: { Authorization: `Bearer ${authToken}` },
        })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(loadOrders(data))
        } else {
            dispatch(
                errorMessage(`Error loading order: ${response.statusText}`)
            )
        }
    } catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading orders'))
    }
}

export const createOrder = () => async (dispatch) => {
    try {
        const authToken = await auth.currentUser.getIdToken()
        const response = await fetch('http://localhost:5001/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })

        if (response.status === 200) {
            dispatch(getOrders())
            dispatch(getCart())
        } else {
            dispatch(
                errorMessage(`Error creating order: ${response.statusText}`)
            )
        }
        return true
    } catch (err) {
        console.log(err)
        dispatch(errorMessage('Error creating order'))
        return false
    }
}
