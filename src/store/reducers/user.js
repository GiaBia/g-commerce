const initialState = null;

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return action.payload
        case 'logout':
            return null
        default:
            return state;
    }
}