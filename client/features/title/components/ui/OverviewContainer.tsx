


import { Typography } from '@mui/material'
import React from 'react'

function OverviewContainer({ text, maxLine = 3 }: { text: string, maxLine: number }) {
    return (
        <Typography
            variant='body1'
            sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: maxLine, 
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
       {text}
        </Typography >
    )
}

export default OverviewContainer
