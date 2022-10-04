import React, { useEffect } from 'react'
import OrderCard from '../components/OrderCard'
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../store/actions/orders'

function OrderHistory() {
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

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