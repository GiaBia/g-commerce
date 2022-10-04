import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase-config'
import { errorMessage } from "./message"


export const login = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const loginAsync = (email, password) => async (dispatch) => {
    try {
        const credentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        console.log(credentials)
        dispatch(login(credentials.user))
    } catch (err) {
        console.log(err)
        dispatch(errorMessage(err.message))
    }
}


export const logoutAsync = () => async (dispatch) => {
    try {
        await signOut(auth)
        dispatch(logout())
    } catch (err) {
        console.log(err)
        dispatch(errorMessage('Error logging out'))
    }
}

export const registerUser = (user) => {
    return (dispatch) => {
        // axios.post('http://localhost:4000/users', user)
        //     .then(res => {
        //         dispatch(login(res.data))
        //     })
        //     .catch(err => {
        //         dispatch(errorMessage(err.message))
        //     })
    }
}