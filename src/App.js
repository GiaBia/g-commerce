import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Checkout from './Views/Checkout'
import ProductPage from './Views/ProductPage'
import Login from './Views/Login';
import OrderHistory from './Views/OrderHistory';
import ProductsPage from './Views/ProductsPage';
import Navbar from './components/Navbar';

function App() {
  return (

    // creating 4 states to handle thebinformation passed through by the user for auth
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products-page" element={<ProductsPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
