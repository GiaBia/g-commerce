import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Checkout from './views/Checkout'
import Login from './views/Login';
import OrderHistory from './views/OrderHistory';
import ProductsPage from './views/ProductsPage';
import AppNav from './components/AppNav';
import AppSnackbar from './components/AppSnackbar';

function App(props) {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <AppNav />
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductsPage />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path='*'
                element={
                  <div>
                    <h2>404 Page not found</h2>
                  </div>
                }
              />

            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
      <AppSnackbar />
    </>
  );
}


export default App;

