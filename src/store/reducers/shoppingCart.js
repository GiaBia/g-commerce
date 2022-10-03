const initialState = [{

    itemIds: [],
    name: 'Skirt',
    price: 23.99,
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    size: "L",
    inventoryId: 3,
    quantity: 5,
},
{
    itemIds: [],
    name: 'Skirt',
    price: 23.99,
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    size: "M",
    inventoryId: 2,
    quantity: 5,
},
{
    itemIds: [],
    name: 'Skirt',
    price: 23.99,
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    size: "S",
    inventoryId: 1,
    quantity: 5,
}]

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'load':
            return action.payload

        default:
            return state;
    }
}
