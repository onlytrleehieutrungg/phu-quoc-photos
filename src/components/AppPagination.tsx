import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function AppPagination() {
  return (
    <Stack spacing={5}>
      <Pagination
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0'
        }}
        count={10}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
