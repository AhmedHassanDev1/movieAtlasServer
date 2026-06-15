
import CastSection from "@/features/title/components/CastSection"
import CastSkeletonGroup from "@/features/title/components/CastSection/CastSkeleton"
import ImagesSection from "@/features/title/components/ImagesSection"
import ReviewsSection from "@/features/title/components/ReviewsSection"
import TitleHeroSection from "@/features/title/components/titleHeroSection"
import VideoSection from "@/features/title/components/videoSection"
import { ViewType } from "@/features/title/types/title"
import { Box } from "@mui/material"
import { notFound } from "next/navigation"
import { Suspense } from "react"

async function getTitleView(id: string): Promise<ViewType> {

  const res = await fetch(`${process.env.API_URL}/title/${id}/view`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) return notFound()
  const data = await res.json()
  return data
}

type Props = {
  params: Promise<{ id: string }>

}

async function page({ params }: Props) {
  const { id } = await params
  const view = await getTitleView(id)


  return (

    <div className="max-w-full  min-h-screen h-fit">
      {/* Hero section */}
      <TitleHeroSection data={view} />

      <Box sx={{
        position: "relative",
        maxWidth: "1200px",
        mx: "auto",
        padding: 2,
        overflow: "hidden"
      }}>

        {/* Cast Title */}
        <Suspense fallback={<CastSkeletonGroup />}>
          <CastSection titleId={id} />
        </Suspense>

        {/* title vidoes  */}
        <Suspense fallback={<CastSkeletonGroup />}>
          <VideoSection titleId={id} />
        </Suspense>

        {/* title images  */}

        <Suspense fallback={<CastSkeletonGroup />}>
          <ImagesSection titleId={id} />
        </Suspense>

        {/* reviews */}
        {/* <Suspense fallback={<CastSkeletonGroup />}>
          <ReviewsSection titleId={id} />
        </Suspense> */}

        {/* similar title*/}
      </Box>

    </div>
  )
}

export default page
