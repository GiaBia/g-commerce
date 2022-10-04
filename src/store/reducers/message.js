export const messageReducer = (state = '', action) => {
    switch (action.type) {
        case 'ERROR_MESSAGE':
            return action.payload

        default:
            return state;
    }
}