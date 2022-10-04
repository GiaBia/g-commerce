import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { errorMessage } from '../store/actions/message'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (auth.currentUser) {
        signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/products')
            }
        })
    }, [])

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
            dispatch(errorMessage(error.message))
        }
    };

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
                    <Button onClick={() => { setIsNewUser(!isNewUser) }} sx={{ color: grey[500], marginRight: 2 }}>{isNewUser ? 'Login' : 'Create User'}</Button>
                    <Button type="submit" variant="contained">{isNewUser ? 'Create User' : 'Login'}</Button>
                </Box>
            </Box >


        </Box>
    )
}

export default Login


