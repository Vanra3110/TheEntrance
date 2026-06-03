import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/Dashboard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu({ onLogoutClick }) {

    const navigate = useNavigate();
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

    if (!userData) {
        return null;
    }

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
                            className="bg-primary text-primary"
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
                                objectFit: "cover"
                            }}
                            src={userData.image} />

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
                PaperProps={{
                    className: "bg-surface-container text-on-surface border border-outline-variant shadow-lg",
                    sx: {
                        width: '220px',
                        mt: 1.5,
                        overflow: 'visible',
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            backgroundColor: 'inherit',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderTop: '1px solid var(--md-sys-color-outline-variant)',
                            borderLeft: '1px solid var(--md-sys-color-outline-variant)'
                        },
                    }
                }}
            >

                <MenuItem
                    className="flex justify-center items-center gap-2"
                    onClick={handleClose}
                >
                    <motion.p
                        initial={{ width: 0 }}
                        animate={{ width: "100%", transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="overflow-hidden whitespace-nowrap text-center font-bold text-[20px] text-primary"
                    >
                        Welcome {userData?.first_name}!
                    </motion.p>
                </MenuItem>

                <MenuItem className='flex gap-2' onClick={() => {
                    handleClose();
                    navigate(`/profile/${userData._id}`);
                }}>
                    {/* <Avatar sx={{ backgroundColor: 'purple' }}> {userData.first_name.charAt(0)}</Avatar> */}
                    <Avatar sx={{ backgroundColor: 'purple' }} src={userData.image} />
                    My account
                </MenuItem>

                <Divider />
                {/* 
                <MenuItem onClick={handleClose}>
                    <ListItemIcon >
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}

                {userData.isAdmin && (
                    <MenuItem className="hover:bg-surface-container-high transition-colors" onClick={() => { handleClose(); navigate('/admin-dashboard'); }}>
                        <ListItemIcon className="text-on-surface-variant">
                            <Dashboard fontSize="small" />
                        </ListItemIcon>
                        Admin Dashboard
                    </MenuItem>
                )}

                <MenuItem className="hover:bg-surface-container-high transition-colors" onClick={handleClose}>
                    <ListItemIcon className="text-on-surface-variant">
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <MenuItem className="hover:bg-surface-container-high transition-colors" onClick={() => { handleClose(); onLogoutClick && onLogoutClick(); }}>
                    <ListItemIcon className="text-on-surface-variant">
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </>
    );
}