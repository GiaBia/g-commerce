import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/actions/products'

function ProductsPage() {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        console.count('ProductPage: getProducts')
        dispatch(getProducts())
    }, [dispatch])

    console.count('ProductPage')

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'center',
            }}
        >
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />
            })}
        </Box>
    )
}

export default ProductsPage
