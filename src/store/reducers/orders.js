const initialState = [{
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

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'load':
            return action.payload

        default:
            return state;
    }
}