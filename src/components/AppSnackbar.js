import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useSelector, useDispatch } from 'react-redux'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
    const dispatch = useDispatch()
    const message = useSelector((state) => state.message)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch({ type: 'CLOSE_MESSAGE' })
    }

    return (
        <Snackbar
            open={message.open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={message.severity}
                sx={{ width: '100%' }}
            >
                {message.message}
            </Alert>
        </Snackbar>
    )
}
