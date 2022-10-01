import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { CardActionArea } from '@mui/material';

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    minWidth: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ProductCard({ product }) {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <>
            <Card sx={{ maxWidth: 345 }} onClick={() => setShowDetails(true)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.imageUrl} //bind this property from product.imageUrl from this image property

                    />
                    <CardContent>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                ${product.price}
                            </Typography>
                        </Box>

                    </CardContent>
                </CardActionArea>
            </Card>

            <Modal
                open={showDetails}
                onClose={() => setShowDetails(false)}
            >
                <Card sx={modalStyles}>
                    <CardMedia
                        component="img"
                        image={product.imageUrl}
                    />
                    <CardContent>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                ${product.price}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="size-label">Size</InputLabel>
                                <Select
                                    labelId="size-label"
                                    id="size-select"


                                    autoWidth
                                    label="Size"
                                >{
                                        product.inventory.map((item) => {
                                            return <MenuItem value={item.id}>{item.size}</MenuItem>

                                        })
                                    }

                                </Select>
                            </FormControl>
                            <Button size="small">Add to Cart</Button>
                        </Box>
                    </CardActions>
                </Card>
            </Modal>
        </>

    );
}
