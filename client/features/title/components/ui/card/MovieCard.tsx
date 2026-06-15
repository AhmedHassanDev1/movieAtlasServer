

import { TitleDetails } from '@/features/title/types/title'
import { genImageUrl } from '@/utils/url'
import { Box, Paper, Typography } from '@mui/material'
import { grey, yellow } from '@mui/material/colors'
import Image from 'next/image'
import Link from 'next/link'
import GradeIcon from '@mui/icons-material/Grade';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddToWatchListButton from '../buttons/ToggleWatchListButton'
import { parseRunTime } from '@/utils/time'

import WatchTrailer from '../buttons/WatchTrailer'

function MovieCard({ title }: { title: TitleDetails }) {
  const posterUrl = genImageUrl(title.poster_path, "poster")
  const runtime = parseRunTime(title?.runtime)
  return (
    <Paper
      sx={{
        flex: "0 0 auto",
        width: {
          xs: 200,
          sm: 250,
          md: 320
        },
        aspectRatio: "2 / 3",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        background: grey[900],
        userSelect: "none",
        position: "relative",
        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Link
        href={`/en/title/${title.id}`}
      >
        {posterUrl && (
          <Image
            src={posterUrl}
            fill
            alt={`poster image for ${title.title}`}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transition: "0.3s ease",

            }}
          />
        )}

        {/* Content */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 3,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,.2)",
            transition: "0.3s ease",
          }}
        >


          <Typography
            variant='h5'
            sx={{ width: "100%" }}
          >
            {title.title || title.original_title}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,

            }} >
            <Typography
              variant='subtitle1'
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
              {title.vote_average?.toFixed(1)}
              <GradeIcon sx={{ color: yellow[900] }} />
            </Typography>

            {title.release_date && (
              <Typography>
                {new Date(title.release_date).getFullYear()}
              </Typography>
            )}
            {runtime && (
              <Typography variant='subtitle1'>
                {runtime}
              </Typography>
            )}
          </Box>
          <WatchTrailer />
        </Box>

      </Link>
      <Box
        sx={{
          position: "absolute",
          insetInlineStart: 3,
          top: 0,
        }}>
        <AddToWatchListButton
          activeIcon={<BookmarkAddedIcon sx={{ fontSize: "40px", color: yellow[800] }} />}
          inactiveIcon={<BookmarkBorderIcon sx={{ fontSize: "40px", color: yellow[800] }} />}
        />
      </Box>

    </Paper>
  )
}

export default MovieCard
