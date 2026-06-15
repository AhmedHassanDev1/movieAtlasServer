"use client"
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material"
import WatchTrailer from "../ui/buttons/WatchTrailer"
import ToggleWatchListButton from "../ui/buttons/ToggleWatchListButton"
import ToggleWatchButton from '../ui/buttons/ToggleWatchButton';


function TitleActionButton() {
  return (
    <Box sx={{
      display: "grid",
      alignItems: "center",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        md: "1fr 1fr auto"
      },
      gridTemplateRows: {
        xs: "1fr 1fr",
        md: "1fr"
      }
    }}>
      <WatchTrailer />
      {/* <ToggleWatchListButton
        render={(state,loading) => (
          <Button
            sx={{
              backgroundColor: "secondary.main",
            }}
          >
            <AddIcon />
            <Typography
              variant="subtitle1"
              sx={{
                wordBreak: "keep-all",
                fontWeight: 700,
              }}>
              Add to watchlist
            </Typography>
          </Button>
        )} />


      <ToggleWatchButton /> */}
    </Box>
  )
}

export default TitleActionButton
