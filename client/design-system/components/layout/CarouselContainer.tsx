"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import CarouselControlButton from '../ui/button/CarouselControlButton'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

type CarouselContainerType = {
    options?: EmblaOptionsType,
    children: ReactNode
}
function CarouselContainer({ options, children }: CarouselContainerType) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        axis: "x",
        skipSnaps: false,
        ...options
    })
    return (
        <Box
            ref={emblaRef}
            sx={{
                width: "100%",
                overflow: "hidden",
                userSelect:"none"
            }}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    gap:2
                }}>
                {children}
            </Box>

        </Box>
    )
}

export default CarouselContainer
