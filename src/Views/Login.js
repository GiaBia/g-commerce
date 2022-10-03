import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase-config'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState({});

    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        //ln17 is very similar to useState. It is a hook that passes auth and recieves a callback func (currentUser) every time they change who's logged in
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        })
    }, [])



    //These functions will mostly return a promise when dealing with firebase. You can approach two methods; .then and .catch, or async await
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isNewUser) {
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
            } else {
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '24px'
        }}>
            <Box onSubmit={onSubmit}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
            >
                <Typography gutterBottom variant="h4" component="div">
                    {isNewUser ? 'Create User' : 'Login'}
                </Typography>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type='email'
                    required
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }} />

                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type='password'
                    required
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                <Box sx={{
                    display: 'flex', justifyContent: 'end',
                }}>
                    <Button onClick={() => { setIsNewUser(!isNewUser) }} sx={{ color: grey[500], marginRight: 10 }}>{isNewUser ? 'Login' : 'Create User'}</Button>
                    <Button type="submit" variant="contained">{isNewUser ? 'Create User' : 'Login'}</Button>
                </Box>
            </Box >

            {/* <h4>User Logged In:</h4>
            {user.email}
            <form name='signOut' onSubmit={logout}>
                <button>Sign Out</button>
            </form> */}
        </Box>
    )
}

export default Login


