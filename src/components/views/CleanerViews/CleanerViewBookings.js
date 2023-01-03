import { Stack } from "@mui/material";
import React from "react";
import AssignedCleanings from "./AssignedCleanings";
import WorkingTime from "./WorkingTime";

const CleanerViewBookings = () => {
  return (
    <Stack>
      <AssignedCleanings />
      <WorkingTime />
    </Stack>
  );
};

export default CleanerViewBookings;
