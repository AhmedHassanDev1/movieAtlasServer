"use client"

import Loading from "@/design-system/components/ui/loading";
import { Box } from "@mui/material"

function AddToWatchListButton({
  activeIcon,
  inactiveIcon,
}: {
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}) {

  const loading = false
  const state = true

  return (
    <Box>
      {loading ? <Box
        sx={{
          position:"relative",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          // height: 25,
          px: 3,
          py: 2,
          cursor: "pointer",

        }}>
        <Loading />
      </Box> : state ? activeIcon : inactiveIcon}
    </Box>
  );
}

export default AddToWatchListButton