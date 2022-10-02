import React from 'react'
import Box from '@mui/material/Box';
import ProductCard from '../components/ProductCard'

const products = [{
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 8
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 7
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 6
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 5
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 4
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 3
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 2
}, {
    name: "Skirt",
    imageUrl: 'https://golf.com/wp-content/uploads/2022/05/RLX-Skirt.jpg',
    description: "BEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu uiBEautiful lovely made in ITaly ya ya ya. ufyg iugy iug iuhb iuhb iu ui",
    price: 27.99,
    inventory: [{
        size: 'S',
        id: 1
    },
    {
        size: 'M',
        id: 2
    },
    ],
    id: 1
}
]
function ProductsPage() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
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