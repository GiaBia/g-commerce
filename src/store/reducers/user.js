const initialState = null;

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state;
    }
}
