


import React from 'react'
import CarouselContainer from '../../../design-system/components/layout/CarouselContainer'
import { Box } from '@mui/material'
import SectionTitle from '../../../design-system/components/ui/SectionTitle'
import { fretchDiscover } from '../api/discover'
import MovieCard from '@/features/title/components/ui/card/MovieCard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link'


async function TrendingSection() {
     const data = await fretchDiscover("trending", 15)
    if (!data?.data) return
    const titles = data.data

    return (
        <Box>
            <Box sx={{
                display: "flex",
                gap: 1,
                alignItems: "center"
            }}>
                <SectionTitle title='title.trending' />
                <Link href={"/en/"}>
                    <ArrowForwardIosIcon sx={{ fontSize: "30px", color: "primary.main" }} />
                </Link>
            </Box>
            <CarouselContainer>
                {titles.map(el => {
                    return <MovieCard
                        key={el.rank}
                        title={el.title}
                    />
                })}
            </CarouselContainer>
        </Box>
    )
}

export default TrendingSection
