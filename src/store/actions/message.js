export const errorMessage = (message) => {
    return {
        type: 'ERROR_MESSAGE',
        payload: message
    }
}

export const successMessage = (message) => {
    return {
        type: 'SUCCESS_MESSAGE',
        payload: message
    }
}