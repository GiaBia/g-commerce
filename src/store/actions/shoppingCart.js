export const addProductToCart = (product) => {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: product
    }
}

export const removeProductFromCart = (product) => {
    return {
        type: 'REMOVE_PRODUCT_FROM_CART',
        payload: product
    }
}

export const loadCart = (cart) => {
    return {
        type: 'LOAD_CART',
        payload: cart
    }
}

export const getCart = async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5001/cart')
        const data = await response.json()
        dispatch(loadCart(data))
    }
    catch (err) {
        console.log(err)
        dispatch(errorMessage('Error loading cart'))
    }
}