import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../store/actions/shoppingCart'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLoggedIn } from '../hooks/userAuth'
import Tooltip from '@mui/material/Tooltip'

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    minWidth: '350px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

export default function ProductCard({ product }) {
    const [size, setSize] = useState('')
    const dispatch = useDispatch()
    const { productId } = useParams()
    const navigate = useNavigate()
    const loggedIn = useLoggedIn()

    const closeModalHandler = () => {
        navigate('/products')
    }

    const handleAddToCart = (event) => {
        console.log('size', size)
        event.preventDefault()
        dispatch(addProductToCart(size, product.name))
    }

    console.count('ProductCard')

    return (
        <>
            <Link to={`/products/${product.id}`}>
                <ImageListItem>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ maxWidth: '200px' }}
                    />
                    <ImageListItemBar
                        title={product.name}
                        subtitle={product.price}
                    />
                </ImageListItem>
            </Link>

            {productId === product.id && (
                <Modal
                    open={productId === product.id}
                    onClose={closeModalHandler}
                >
                    <Card sx={modalStyles}>
                        <CardMedia
                            component="img"
                            image={product.imageUrl}
                            sx={{ maxWidth: '300px' }}
                        />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    component="div"
                                >
                                    ${product.price}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box
                                component="form"
                                onSubmit={handleAddToCart}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                }}
                            >
                                <FormControl sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="size-label">
                                        Size
                                    </InputLabel>
                                    <Select
                                        required
                                        value={size}
                                        onChange={(event) =>
                                            setSize(event.target.value)
                                        }
                                        labelId="size-label"
                                        id="size-select"
                                        autoWidth
                                        label="Size"
                                    >
                                        {product.inventory.map((item) => {
                                            return (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.size}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <Tooltip
                                    title={
                                        loggedIn
                                            ? ''
                                            : 'Please login to add to cart'
                                    }
                                    arrow
                                >
                                    <Box>
                                        <Button
                                            disabled={!loggedIn}
                                            type="submit"
                                            variant="outlined"
                                            size="small"
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </Tooltip>
                            </Box>
                        </CardActions>
                    </Card>
                </Modal>
            )}
        </>
    )
}
