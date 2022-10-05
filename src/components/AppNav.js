import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../store/actions/shoppingCart'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useLoggedIn } from '../hooks/userAuth'

const drawerWidth = 240

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: 10,
        border: `2px solid ${theme.palette.primary.main}`,
        padding: '0 4px',
    },
}))

const AppNav = (props) => {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const shoppingCart = useSelector((state) => state.shoppingCart)
    const dispatch = useDispatch()
    const loggedIn = useLoggedIn()

    useEffect(() => {
        if (loggedIn) {
            dispatch(getCart())
        }
    }, [dispatch, loggedIn])

    const shoppingCartSize = shoppingCart.reduce((acc, item) => {
        return acc + item.quantity
    }, 0)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ my: 2, fontFamily: 'Montez' }}>
                G Commerce
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <Link to="/products">
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {loggedIn && (
                    <ListItem disablePadding>
                        <Link to="/orders">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
                {loggedIn && (
                    <ListItem disablePadding>
                        <Link to="/checkout">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Checkout" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
                {!loggedIn && (
                    <ListItem disablePadding>
                        <Link to="/login">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
                {loggedIn && (
                    <ListItem disablePadding>
                        <Link to="/login">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
            </List>
        </Box>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    if (loggedIn === null) {
        return null
    }

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
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontFamily: 'Montez',
                        }}
                    >
                        G Commerce
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link to="/products">
                            <Button sx={{ color: 'inherit' }}>Products</Button>
                        </Link>
                        {loggedIn && (
                            <Link to="/orders">
                                <Button sx={{ color: 'inherit' }}>
                                    Orders
                                </Button>
                            </Link>
                        )}
                        {loggedIn && (
                            <Link to="/checkout">
                                <IconButton
                                    style={{
                                        color: 'inherit',
                                        marginRight: '10px',
                                    }}
                                    aria-label="cart"
                                    fontSize="small"
                                >
                                    <StyledBadge
                                        badgeContent={shoppingCartSize}
                                        color="secondary"
                                    >
                                        <ShoppingCartIcon fontSize="small" />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        )}
                        {!loggedIn && (
                            <Link to="/login">
                                <Button sx={{ color: 'inherit' }}>Login</Button>
                            </Link>
                        )}
                        {loggedIn && (
                            <Link to="/login">
                                <Button sx={{ color: 'inherit' }}>
                                    Logout
                                </Button>
                            </Link>
                        )}
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
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default AppNav
