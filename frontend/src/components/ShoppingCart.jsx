import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 20,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function ShoppingCart(props) {
    return (
        <IconButton aria-label="cart"
            sx={{
                color: "#ffffffff",
            }}
            onClick={props.onClick}>
            <StyledBadge badgeContent={props.badgeContent} color="secondary">
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </StyledBadge>
        </IconButton>
    );
}
