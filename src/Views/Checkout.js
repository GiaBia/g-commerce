import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import CartItemCard from '../components/CartItemCard'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../store/actions/shoppingCart'
import { createOrder } from '../store/actions/orders'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const shoppingCart = useSelector((state) => state.shoppingCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        dispatch(getCart()).then(() => setIsLoading(false))
    }, [dispatch])

    const createOrderHandler = async () => {
        if (await dispatch(createOrder())) {
            navigate('/orders')
        }
    }

    const subtotal = shoppingCart.reduce((subtotal, cartItem) => {
        subtotal += cartItem.price * cartItem.quantity
        return subtotal
    }, 0)
    const tax = subtotal * 0.06
    const total = subtotal + tax

    if (isLoading) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>
    } else if (shoppingCart.length === 0) {
        return (
            <div style={{ textAlign: 'center' }}>
                Your shopping cart is empty...
            </div>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            <TransitionGroup
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                {shoppingCart.map((cartItem) => {
                    return (
                        <Collapse key={cartItem.inventoryId}>
                            <CartItemCard cartItem={cartItem} />
                        </Collapse>
                    )
                })}
            </TransitionGroup>
            <Card
                sx={{
                    maxWidth: '500px',
                    minWidth: '350px',
                }}
            >
                <CardContent>
                    <Typography
                        sx={{
                            fontSize: 14,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        color="text.secondary"
                        gutterBottom
                    >
                        <span>Subtotal:</span>
                        <span>{subtotal.toFixed(2)} </span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        color="text.secondary"
                    >
                        <span>Tax:</span>
                        <span>{tax.toFixed(2)}</span>
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        variant="h6"
                        component="div"
                    >
                        <span>Total:</span>
                        <span>{total.toFixed(2)}</span>
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        onClick={createOrderHandler}
                        variant="outlined"
                        size="small"
                    >
                        Place Order
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Checkout
