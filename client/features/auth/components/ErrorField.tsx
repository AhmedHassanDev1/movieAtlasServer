
import { Typography } from '@mui/material'
import React from 'react'

function ErrorField({ message }: { message: string | null }) {
    return (
        <Typography variant="body2" color='error'>
            {message}
        </Typography>
    )
}

export default ErrorField
