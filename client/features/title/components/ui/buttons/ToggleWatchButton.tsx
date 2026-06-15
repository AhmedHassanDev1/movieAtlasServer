

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Typography } from '@mui/material';

function ToggleWatchButton() {
    return (
        <Button sx={{
            display: "flex",
            gap: 1, border: "1px solid",
            color: "#5799ef",
            padding: 2,
            borderRadius: "20px",
            gridColumn: {
                xs: "1 / span 2",
                md: "3/ span 3",
            },
            backgroundColor: "transparent"
        }}>
            <RemoveRedEyeIcon />
            <Typography
                variant="subtitle1"
                sx={{fontWeight: 700}}
            >watch
            </Typography>
        </Button>
    )
}

export default ToggleWatchButton
