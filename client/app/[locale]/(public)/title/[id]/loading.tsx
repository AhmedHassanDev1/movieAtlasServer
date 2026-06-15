


import { Box, Grid, Stack, Skeleton } from "@mui/material";

export default function TitleHeroSkeleton() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* BACKDROP SKELETON */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(255,255,255,0.03)",
        }}
      />

      <Grid
        container
        sx={{
          minHeight: "90vh",
          position: "relative",
          placeItems: "end",
          padding: 2,
          gap: 3,
          zIndex: 2,
        }}
      >
        {/* POSTER */}
        <Grid
          size={{ xs: 12, lg: 5 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: 280,
              height: 420,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />
        </Grid>

        {/* DETAILS */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* DIRECTOR LINE */}
          <Skeleton
            variant="text"
            width="60%"
            height={30}
            sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
          />

          {/* TITLE */}
          <Skeleton
            variant="text"
            width="80%"
            height={80}
            sx={{ bgcolor: "rgba(255,255,255,0.12)" }}
          />


          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Skeleton width={40} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={80} height={20} />
            <Skeleton width={60} height={20} />
          </Stack>

          {/* GENRES */}
          <Stack direction="row" spacing={1}>
            <Skeleton width={60} height={24} />
            <Skeleton width={60} height={24} />
            <Skeleton width={60} height={24} />
          </Stack>

          {/* OVERVIEW */}
          <Box>
            <Skeleton width="100%" height={20} />
            <Skeleton width="90%" height={20} />
            <Skeleton width="80%" height={20} />
          </Box>

          {/* ACTION BUTTON */}
          <Skeleton
            variant="rounded"
            width={160}
            height={45}
          />

          {/* DIVIDER SPACE */}
          <Box sx={{ height: 20 }} />

          {/* DIRECTORS + ACTORS */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Skeleton width={90} height={20} />
              <Skeleton width={120} height={20} />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Skeleton width={70} height={20} />
              <Skeleton width={90} height={20} />
              <Skeleton width={80} height={20} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}