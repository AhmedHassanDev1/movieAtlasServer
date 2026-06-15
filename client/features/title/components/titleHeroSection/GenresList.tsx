
import {  Chip, Stack } from '@mui/material'
import { GenreType } from '../../types/title'


function GenresList({ genres }: { genres: GenreType[] }) {
  return (
    <Stack direction={"row"} sx={{ gap: 3 }} >
      {genres.map(el => (
        <Chip
          key={el.id}
          variant='outlined'
          label={el.name}
        />

      ))}
    </Stack>
  )
}

export default GenresList
