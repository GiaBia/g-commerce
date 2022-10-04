export const messageReducer = (state = { open: false, severity: 'success', message: '' }, action) => {
    switch (action.type) {
        case 'ERROR_MESSAGE':
            return { open: true, severity: 'error', message: action.payload }
        case 'SUCCESS_MESSAGE':
            return { open: true, severity: 'success', message: action.payload }
        case 'CLOSE_MESSAGE':
            return { ...state, open: false }
        default:
            return state;
    }
}
