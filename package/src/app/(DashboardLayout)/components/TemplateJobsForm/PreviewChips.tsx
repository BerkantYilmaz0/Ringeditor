'use client';
import { Box, Chip } from '@mui/material';

export default function PreviewChips({ times }: { times: string[] }) {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {times.map((t, i) => (
        <Chip key={i} label={t} variant="outlined" size="small" color="primary" />
      ))}
    </Box>
  );
}
