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




function MobileDrawer(props) {
    const [open, setOpen] = React.useState(false);
    const userData = props.userData;
    if (!userData) {
        return null
    }

    let navItems = [
    { label: 'Home', path: '/' },
    // { label: 'Solutions', path: '/solutions' },
    { label: 'Products', path: '/products' },
    // { label: 'Enterprise', path: '/admin-dashboard' },
    { label: 'Support', path: '/contacts' }
    ];

    if (userData.isAdmin){
        navItems = [
            { label: 'Home', path: '/' },
            // { label: 'Solutions', path: '/solutions' },
            { label: 'Products', path: '/products' },
            { label: 'Admin Dashboard', path: '/admin-dashboard' },
            { label: 'Support', path: '/contacts' }
        ];
    }
    
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
            sx={{ width: 200 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className="h-full bg-surface-container-low relative"
        >
            <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between bg-surface-container">
                <span className="font-headline-md font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>shield</span>
                    TheEntrance
                </span>
                <button onClick={toggleDrawer(false)} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full hover:bg-surface-container-high">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <List className="px-3 pt-6 space-y-2">
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            className="rounded-lg hover:bg-surface-container-high transition-colors py-3"
                        >
                            <ListItemText
                                // primary={item.label}
                                primaryTypographyProps={{ className: 'font-label-md text-on-surface px-2' }}
                            />
                            <span className='text-on-surface px-2'>{item.label}</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <div className="absolute bottom-0 w-full p-6 border-t border-outline-variant bg-surface-container">
                <Link to="/contacts" className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20" onClick={toggleDrawer(false)}>
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                    Contact Sales
                </Link>
            </div>
        </Box>
    );

    return (
        <div className="flex xl:hidden items-center">
            <IconButton
                onClick={toggleDrawer(true)}
                aria-label="open drawer"
                className="text-primary hover:bg-surface-container-high transition-colors"
                sx={{ color: '#3b82f6' }}
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
                    className: 'border-l border-outline-variant',
                    style: { backgroundColor: '#09090b', backgroundImage: 'none' }
                }}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}

export default MobileDrawer;