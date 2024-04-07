import React, { useState } from 'react';
import {Box, Grid, SelectChangeEvent} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BillingList from './components/Templates/BillingList.component';
import Info from './Info';
import MobileContent from './components/Organisms/MobileInfo.component';
import SwitchLabel from './components/Molecules/SwitchLabel.component';
import QueryContext from './Context/QueryContext.context';
import { ServiceType } from './types/types';
import SelectService from './components/Molecules/SelectService.component';

export default function Checkout() {
  const defaultTheme = createTheme({ palette: { mode: 'light' } });
  const [isPending, setIsPending] = useState<boolean>(true);
  const [clientId, setClientId] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  }
  const handleService = (event: SelectChangeEvent) => {
    event.preventDefault();
    setServiceType(event.target.value as ServiceType);
  };
  return (
    <QueryContext.Provider
      value={{
        clientId,
        isPending,
        serviceType,
        refresh,
        handleRefresh,
        setClientId,
        setServiceType,
      }}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
        <Grid item xs={12} sm={5} lg={4} sx={styles.infoGrid}>
          <Box sx={styles.infoBox}>
            <Info />
          </Box>
        </Grid>
        <Grid item sm={12} md={7} lg={8} sx={styles.contentGrid}>
          <MobileContent />
          <Box sx={styles.contentBox}>
            <div style={{display: 'flex'}}>
              <SwitchLabel
                isPending={isPending}
                labelActivated='pending'
                labelDeactivated='paid'
                onChange={(activated: boolean) => setIsPending(activated)}
              />
              <SelectService serviceType={serviceType as ServiceType} handleService={handleService} />
            </div>
            <React.Fragment>
              <BillingList />
            </React.Fragment>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </QueryContext.Provider>
  );
}

const styles = {
  infoGrid: {
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    borderRight: { sm: 'none', md: '1px solid' },
    borderColor: { sm: 'none', md: 'divider' },
    alignItems: 'start',
    pt: 4,
    px: 10,
    gap: 4,
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    maxWidth: 500,
  },
  contentGrid: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    backgroundColor: { xs: 'transparent', sm: 'background.default' },
    alignItems: 'start',
    pt: { xs: 2, sm: 4 },
    px: { xs: 2, sm: 10 },
    gap: { xs: 4, md: 8 },
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    maxWidth: { sm: '100%', md: 600 },
    maxHeight: '720px',
    gap: { xs: 5, md: 'none' },
  }
}