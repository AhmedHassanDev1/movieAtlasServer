

import SectionTitle from '@/design-system/components/ui/SectionTitle'
import { Box } from '@mui/material'
import { CastResonseType } from '../../types/person'
import CastCarousel from './CastCarousel'
 

async function getCast(titleId: string): Promise<CastResonseType> {
    const res = await fetch(`${process.env.API_URL}/title/${titleId}/credit?job=actor`, {
        next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error("")
    const data = await res.json()
    return data
}


async function CastSection({ titleId }: { titleId: string }) {
    const data = await getCast(titleId)
    const cast = data.data


    return (
        <Box component="section"
            sx={{
                minHeight: "500px",
                padding: "10px"
            }}>
            <SectionTitle title={"title.cast"}/>
            <CastCarousel data={cast}/>
        </Box>
    )
}

export default CastSection
