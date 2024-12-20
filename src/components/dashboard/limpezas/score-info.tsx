import React from 'react';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

interface ScoreProps {
  name: string;
  score: number;
  comment: string;
}

function ScoreInfo({ name, score, comment }: ScoreProps): React.ReactElement {
  return (
    <Stack gap={2} sx={{ alignItems: 'center' }}>
      <Stack direction="row" sx={{ width: 150, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: score > 6 ? 'green' : score > 3 ? 'darkorange' : 'red',
            borderRadius: '50%',
            width: 30,
            height: 30,
            color: 'white',
          }}
        >
          <Typography sx={{ fontSize: 20 }}>{score}</Typography>
        </Box>
      </Stack>
      <Box>
        <Typography sx={{ fontSize: 20 }}>{comment}</Typography>
      </Box>
    </Stack>
  );
}

export default ScoreInfo;
