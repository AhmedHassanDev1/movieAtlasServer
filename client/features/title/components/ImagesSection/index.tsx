import { Box, Grid, Stack } from "@mui/material"

import SectionTitle from "@/design-system/components/ui/SectionTitle"
import { ImagesReponseType } from "../../types/media"

import Image from "next/image"

async function getImages(titleId: string): Promise<ImagesReponseType> {
    const res = await fetch(`${process.env.API_URL}/title/${titleId}/images?limit=5`, {
        next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error("")
    const data = await res.json()
    return data
}

async function ImagesSection({ titleId }: { titleId: string }) {
    const data = await getImages(titleId)


    const images = data.data

    if (images.length === 0) {
        return (
            <Stack spacing={2}>
                <SectionTitle title="title.images" />

                <Box
                    sx={{
                        aspectRatio: "16/9",
                        bgcolor: "grey.900",
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    No Images Available
                </Box>
            </Stack>
        );
    }

    const imageHeroUrl = images[0].url
    return (

        <Stack direction={"column"}>
            <SectionTitle title="title.images" />

            <Box
                sx={{
                    width: "100%",
                    aspectRatio: "16/9",
                    position: "relative",
                    borderRadius: 2,
                }}
            >
                <Image
                    src={imageHeroUrl as string}
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    alt="tile image"
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    }}
                />
            </Box>
            {/* small images gallery */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    overflowX: "auto",
                    p: 2,
                }}
            >
                {images.slice(1).map((img) => (
                    <Box
                        key={img.id}
                        sx={{
                            flex:{
                                xs:"0 0 calc((100% - 24px) / 2)",
                                md:"0 0 calc((100% - 24px) / 4)"
                            },
                            aspectRatio: "16/9",
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src={img.url}
                            fill
                            alt=""
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                ))}
            </Box>

        </Stack >

    )
}

export default ImagesSection
