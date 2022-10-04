import { errorMessage } from "./message"

export const loadOrders = (orders) => {
    return {
        type: 'LOAD_ORDERS',
        payload: orders
    }
}

export const getOrders = () => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5001/orders')
        const data = await response.json()
        dispatch(loadOrders(data))
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading orders'))
    }
}

export const createOrder = (order) => async (dispatch) => {
    const response = await fetch('http://localhost:5001/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    const data = await response.json()
    dispatch({ type: 'create', payload: data })
}