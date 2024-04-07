import * as React from 'react';
import Typography from '@mui/material/Typography';
import ClientList from './components/Templates/ClientList.component';

export default function Info() {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Select a client
      </Typography>
      <ClientList />
    </React.Fragment>
  );
}