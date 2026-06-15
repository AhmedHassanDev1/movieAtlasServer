

import SectionTitle from '@/design-system/components/ui/SectionTitle'
import { Box } from '@mui/material'
import React from 'react'

function ReviewsSection({titleId}:{titleId:string}) {
  return (
    <Box component="section">
      <SectionTitle title="title.reviews"/>
    </Box>
  )
}

export default ReviewsSection
