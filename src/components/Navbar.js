import React from 'react'
import { Link } from 'react-router-dom'




const Navbar = () => {



    return (
        <header>
            <nav>
                <Link to="/login"> Login</Link>
                <Link to="/product-page"> Product Page</Link>
                <Link to="/checkout"> Checkout</Link>
                <Link to="/products-page"> Products Page</Link>
                <Link to="/order-history"> Order History</Link>
            </nav>
        </header>
    )
}

export default Navbar