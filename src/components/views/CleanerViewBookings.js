import { Stack } from '@mui/material'
import React from 'react'
import AssignedCleanings from '../cleaner/AssignedCleanings'
import WorkingTime from '../cleaner/WorkingTime'

const CleanerViewBookings = () => {
  return (
    <Stack>
      <AssignedCleanings />
      <WorkingTime />
    </Stack>
  )
}

export default CleanerViewBookings
