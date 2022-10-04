const initialState = []

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.payload

        default:
            return state;
    }
}
