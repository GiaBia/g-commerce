import React from 'react'
import Box from '@mui/material/Box';
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'




function ProductsPage() {
    const products = useSelector(state => state.products)
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '24px'
        }}>
            {
                products.map((product) => {
                    return <ProductCard key={product.id} product={product} />

                })
            }
        </Box>
    )

}

export default ProductsPage