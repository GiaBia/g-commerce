import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';


function CartItemCard({ cartItem }) {
    return (
        <Card sx={{
            maxWidth: 500,
            minWidth: 350,
        }}>
            <CardMedia
                component="img"
                image={cartItem.imageUrl}
            />
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {cartItem.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Size:{cartItem.size}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Quantity:{cartItem.quantity}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        ${cartItem.price}
                    </Typography>
                </Box>

            </CardContent>
            <CardActions>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'baseline'
                }}>

                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    )
}

export default CartItemCard