import SectionTitle from "@/design-system/components/ui/SectionTitle"

import { VideoAsset, VideosReponseType } from "../../types/media"
import { Box, Stack, Grid } from "@mui/material"

import MainVideo from "./MainVideo"
import VideoCard from "./VideoCard"

async function getVideos(titleId: string): Promise<VideosReponseType> {
    const res = await fetch(`${process.env.API_URL}/title/${titleId}/videos?limit=5`, {
        next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error("")
    const data = await res.json()
    return data
}
async function VideoSection({ titleId }: { titleId: string }) {
    const videos = (await getVideos(titleId)).data

    const selected = videos[0]


    if (videos.length === 0) return null;

    return (
        <Stack spacing={3}>
            <SectionTitle title="title.videos" />
            <MainVideo video={selected} />
            <Grid
                container
                spacing={2}  >
                {videos.slice(0, 5).map((video) => (
                    <Grid
                        key={video.id}
                        size={{xs:6,lg:3}}>
                        <VideoCard

                            video={video}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
export default VideoSection
