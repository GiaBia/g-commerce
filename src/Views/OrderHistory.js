import React from 'react'
import OrderCard from '../components/OrderCard'
import Box from '@mui/material/Box';


const orders = [{
    id: 1,
    createdAt: '2022-02-22',
    subtotal: 300.3,
    tax: 90,
    total: 390.3,
    items: [{
        price: 10,
        imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
        name: 'Skirt',
        size: 'M',
        quantity: 4,
        productId: 2,
        inventoryId: 4,
    }, {
        price: 12.93,
        imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
        name: 'Skirt',
        size: 'M',
        quantity: 4,
        productId: 2,
        inventoryId: 4,
    }]
}, {
    id: 2,
    createdAt: '2022-9-22',
    subtotal: 300.3,
    tax: 90,
    total: 390.3,
    items: [{
        price: 10,
        imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
        name: 'Skirt',
        size: 'M',
        quantity: 4,
        productId: 2,
        inventoryId: 4,
    }, {
        price: 12.93,
        imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
        name: 'Skirt',
        size: 'M',
        quantity: 4,
        productId: 2,
        inventoryId: 4,
    }]
}]


function OrderHistory() {

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