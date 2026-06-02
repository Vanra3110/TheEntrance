import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation } from 'react-router-dom';

export default function Menu(props) {
    const location = useLocation();

    const userData = props.userData;
    if (!userData) {
        return null
    }

    return (
        <Box className="hidden xl:flex w-full justify-center">
            <BottomNavigation
                showLabels
                value={location.pathname}
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '16px',
                        fontWeight: '500'
                    },
                    '& .MuiBottomNavigationAction-label.Mui-selected': {
                        fontSize: '18px',
                        fontWeight: 'bold'
                    },
                    // backgroundColor: 'black',
                }}
                className="w-full max-w-3xl bg-gray-900 rounded-2xl px-4 py-2 shadow-lg"
            >
                <BottomNavigationAction
                    component={Link}
                    to="/"
                    value="/"
                    label="Home"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/solutions"
                    value="/solutions"
                    label="Solutions"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    component={Link}
                    to="/products"
                    value="/products"
                    label="Products"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/support"
                    value="/support"
                    label="Support"
                    className="text-gray-400 hover:text-blue-400"
                />

                {userData.isAdmin && (
                    <BottomNavigationAction
                        component={Link}
                        to="/admin-dashboard"
                        value="/admin-dashboard"
                        label="Enterprise"
                        className="text-gray-400 hover:text-blue-400"
                    />
                )}
            </BottomNavigation>
        </Box >
    );
}