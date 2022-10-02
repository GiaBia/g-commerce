import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import moment from 'moment'


export default function OrderCard({ order }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 500, minWidth: 300 }}>

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {order.id}
                    </Avatar>
                }
                title={moment(order.createdAt).format("MMMM D YYYY, h:mm a")}
                subheader={`$${order.total.toFixed(2)}`}
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {order.items.map((item) => {
                        return (
                            <Link key={item.inventoryId} to={`/products/${item.productId}`}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} src={item.imageUrl} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)} Size: ${item.size} Quantity: ${item.quantity}`} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </Collapse>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="outlined"
                    onClick={handleExpandClick}>
                    {!expanded ? 'View Order Details' : 'Hide'}
                </Button>
            </CardActions>
        </Card >
    );
}
