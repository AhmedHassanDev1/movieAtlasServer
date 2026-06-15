"use client"
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Chip, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';


function WatchListButton() {
  const t = useTranslations("global")
  const count = 12
  return (
    <Link href={"user/:id/watchlist"}>
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <BookmarkAddIcon />
        <Typography 
        variant='subtitle2' 
        sx={{ fontWeight: 500 }}
        >
          {t("watchlist")}
          </Typography>
        {count ? (
          <Chip
            label={count<=100?count:"99+"}
            size="small"
            sx={{
              backgroundColor: "primary.main",
              mx: 1,
              fontWeight:600,
              color:"white"
            }} />
        ) : null}
      </Stack>
    </Link>
  )
}

export default WatchListButton
