// import * as React from 'react';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import { Link } from 'react-router-dom';

// export default function Menu() {
//     const [value, setValue] = React.useState(0);

//     return (
//         <Box sx={{ width: 500 }}>
//             <BottomNavigation
//                 showLabels
//                 value={value}
//                 onChange={(event, newValue) => {
//                     setValue(newValue);
//                 }}
//                 sx={{
//                     '& .MuiBottomNavigationAction-label': {
//                         fontSize: '16px',
//                         fontWeight: '500'
//                     },
//                     '& .MuiBottomNavigationAction-label.Mui-selected': {
//                         fontSize: '18px',
//                         fontWeight: 'bold'
//                     }
//                 }}
//             >
//                 <BottomNavigationAction component={Link} to="/home" label="Home" />
//                 <BottomNavigationAction component={Link} to="/solutions" label="Solutions" />
//                 <BottomNavigationAction component={Link} to="/products" label="Products" />
//                 <BottomNavigationAction component={Link} to="/support" label="Support" />
//                 <BottomNavigationAction component={Link} to="/enterprise" label="Enterprise" />
//             </BottomNavigation>
//         </Box>
//     );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';

export default function Menu() {
    const [value, setValue] = React.useState(0);

    return (
        <Box className="hidden xl:flex w-full justify-center">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '16px',
                        fontWeight: '500'
                    },
                    '& .MuiBottomNavigationAction-label.Mui-selected': {
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }
                }}
                className="w-full max-w-3xl bg-gray-900 rounded-2xl px-4 py-2 shadow-lg"
            >
                <BottomNavigationAction
                    component={Link}
                    to="/home"
                    label="Home"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/solutions"
                    label="Solutions"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/products"
                    label="Products"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/support"
                    label="Support"
                    className="text-gray-400 hover:text-blue-400"
                />

                <BottomNavigationAction
                    // component={Link}
                    // to="/enterprise"
                    label="Enterprise"
                    className="text-gray-400 hover:text-blue-400"
                />
            </BottomNavigation>
        </Box>
    );
}