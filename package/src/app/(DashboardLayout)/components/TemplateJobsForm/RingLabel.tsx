'use client';
import { Box } from '@mui/material';
import { RingType } from '@/types/jobs';

export default function RingLabel({ ring }: { ring?: RingType }) {
  return (
    <Box component="span" display="inline-flex" alignItems="center" gap={1}>
      <Box
        component="span"
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: ring?.color || '#ccc',
          display: 'inline-block',
        }}
      />
      {ring?.name ?? '-'}
    </Box>
  );
}
