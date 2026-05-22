import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';

export default function AccountMenu({ onLogoutClick }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const session = sessionStorage.getItem('session');
    const userData = session ? JSON.parse(session) : null;

    return (
        <>
            <Box
                className="flex items-center justify-center md:justify-end"
            >
                <Tooltip title="Account settings">

                    <IconButton
                        onClick={handleClick}
                        size="small"
                        className="ml-2"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                    >

                        <Avatar
                            className="bg-primary text-white "
                            sx={{
                                width: {
                                    xs: 28,
                                    sm: 32,
                                    md: 40
                                },
                                height: {
                                    xs: 28,
                                    sm: 32,
                                    md: 40
                                },
                                backgroundColor: '#312e81',
                            }}
                        >
                            {userData.first_name.charAt(0)}
                        </Avatar>

                    </IconButton>

                </Tooltip>
            </Box>

            <Menu
                className='relative'
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
            >

                <MenuItem
                    className="flex justify-center items-center gap-2"
                    onClick={handleClose}
                >
                    <motion.p
                        initial={{ width: 0 }}
                        animate={{ width: "100%", transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="overflow-hidden whitespace-nowrap text-center font-bold text-[20px] decoration-secondary text-on-secondary-fixed"
                    >
                        Welcome {userData?.first_name}!
                    </motion.p>
                </MenuItem>

                <MenuItem className='flex gap-2' onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>

                <Divider />
                {/* 
                <MenuItem onClick={handleClose}>
                    <ListItemIcon >
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <MenuItem onClick={() => { handleClose(); onLogoutClick && onLogoutClick(); }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </>
    );
}