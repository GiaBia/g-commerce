export const errorMessage = (message) => {
    return {
        type: 'ERROR_MESSAGE',
        payload: message
    }
}