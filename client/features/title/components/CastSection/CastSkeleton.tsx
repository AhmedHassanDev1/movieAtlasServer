

import { Box, Skeleton } from "@mui/material"

function CastSkeletonGroup() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:"repeat(5,1fr)",
        gap: 4,
        padding:5,
        overflow: "hidden",
        width: "100%",
        height:"300px"
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-full rounded-2xl  overflow-hidden"
        >
          {/* image skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height="70%"
            animation="wave"
          />

          {/* text area */}
          <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rounded" width="100%" height={28} />
          </Box>
        </div>
      ))}
    </Box>
  )
}

export default CastSkeletonGroup