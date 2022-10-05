import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import { removeProductFromCart } from '../store/actions/shoppingCart'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function CartItemCard({ cartItem }) {
    const dispatch = useDispatch()
    console.log(cartItem)
    const removeProductHandler = () => {
        dispatch(removeProductFromCart(cartItem.inventoryId, cartItem.name))
    }

    return (
        <Card
            sx={{
                maxWidth: '350px',
                minWidth: '300px',
            }}
        >
            <Link to={`/products/${cartItem.productId}`}>
                <CardMedia component="img" image={cartItem.imageUrl} />
            </Link>
            <CardContent
                sx={{
                    paddingBottom: 0,
                }}
            >
                <Box
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}
                >
                    <Typography gutterBottom variant="h6" component="div">
                        {cartItem.name}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                    >
                        Size: {cartItem.size}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                    >
                        Quantity: {cartItem.quantity}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                    >
                        ${cartItem.price}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    paddingTop: 0,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'baseline',
                    }}
                >
                    <IconButton
                        onClick={removeProductHandler}
                        aria-label="delete"
                        size="large"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    )
}

export default CartItemCard
