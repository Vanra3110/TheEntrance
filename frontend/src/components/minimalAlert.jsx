import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({ open, onClose }) {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 90,
            right: '50%',
            zIndex: 9999,
            minWidth: 300,
            transform: 'translateX(50%)',

        }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Item Added to Cart Successfully!
                </Alert>
            </Collapse>
        </Box>
    );
}