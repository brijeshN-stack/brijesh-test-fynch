'use client';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import { Box } from '@mui/material';
import './reduxToastify.css';

export function ReduxToastify() {
  return (
    <Box>
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position='top-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar={false}
        closeOnToastrClick
      />
    </Box>
  );
}
