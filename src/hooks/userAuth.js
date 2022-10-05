import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config'

export const useLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setLoggedIn(!!currentUser)
        })
    }, [])

    return loggedIn
}
