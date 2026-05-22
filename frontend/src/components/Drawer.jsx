import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Products', path: '/products' },
    { label: 'Support', path: '/support' },
    { label: 'Enterprise', path: '/enterprise' }
];

export default function MobileDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setOpen(newOpen);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className="h-full bg-surface"
        >
            <div className="p-4 border-b border-outline-variant">
                <span className="font-headline-md font-bold text-primary">Menu</span>
            </div>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ className: 'font-body-md text-on-surface' }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className="flex xl:hidden items-center">
            <IconButton
                onClick={toggleDrawer(true)}
                aria-label="open drawer"
                className="text-primary"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableScrollLock
                PaperProps={{
                    className: 'bg-surface'
                }}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
