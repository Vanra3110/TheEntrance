import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
    const location = useLocation();

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
                    to="/home"
                    value="/home"
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
                    to="/details"
                    value="/details"
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

                <BottomNavigationAction
                    // component={Link}
                    // to="/enterprise"
                    value="/enterprise"
                    label="Enterprise"
                    className="text-gray-400 hover:text-blue-400"
                />
            </BottomNavigation>
        </Box >
    );
}