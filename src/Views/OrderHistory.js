import React from 'react'
import OrderCard from '../components/OrderCard'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'




function OrderHistory() {
    const orders = useSelector(state => state.orders)
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '24px'
        }}>
            {
                orders.map((order) => {
                    return <OrderCard key={order.id} order={order} />
                })
            }
        </Box>
    )
}


export default OrderHistory