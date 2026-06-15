import TrendingSection from "@/features/home/components/TrendingSection";
import { fretchDiscover } from "@/features/home/api/discover";
import Hero from "@/features/home/components/hero";

import { Stack } from "@mui/material";
import { Suspense } from "react";
import MovieCardSkeletonGroup from "@/features/title/components/ui/Skeleton/movieCardSkeleton";


export default async function Home() {
  const HeroContent = await fretchDiscover("upcoming",5)
   

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: 2
      }}
    >
      <Hero data={HeroContent?.data} />

      {/* trending section */}
     <Suspense fallback={<MovieCardSkeletonGroup/>}>
       <TrendingSection />
     </Suspense>
      
    </Stack>
  );
}
