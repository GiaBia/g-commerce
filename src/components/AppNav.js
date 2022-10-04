import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const drawerWidth = 240;
const navItems = [

    {
        to: '/products',
        text: 'Products',
        loggedOut: true,
        loggedIn: true
    },
    {
        to: '/orders',
        text: 'Orders',
        loggedOut: false,
        loggedIn: true
    },
    {
        to: '/checkout',
        text: 'Cart',
        loggedOut: false,
        icon: ShoppingCart,
        loggedIn: true
    },
    {
        to: '/login',
        text: 'Login',
        loggedOut: true,
        loggedIn: false
    },
    {
        to: '/login',
        text: 'Logout',
        loggedOut: false,
        loggedIn: true
    }
];


const AppNav = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = useState(null);



    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        })
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                GCommerce
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Link to={item.to}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.text} />

                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        GCommerce
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.filter((item) => {
                            if (user) {
                                return item.loggedIn
                            } else {
                                return item.loggedOut
                            }
                        }).map((item) => (
                            <Link key={item.text} to={item.to}>
                                {item.icon ?
                                    <IconButton style={{ color: 'inherit' }} size="small" aria-label="checkout">
                                        <item.icon fontSize="small" />
                                    </IconButton> : <Button sx={{ color: '#fff' }}>
                                        {item.text}
                                    </Button>
                                }
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default AppNav;