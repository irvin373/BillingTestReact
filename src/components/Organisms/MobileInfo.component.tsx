import {Card, CardContent} from '@mui/material';
import InfoMobile from './InfoMobile.component';

export default function MobileContent() {
  return (
    <Card
      sx={{
        display: { xs: 'flex', md: 'none' },
        width: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          ':last-child': { pb: 2 },
        }}
      >
        <InfoMobile />
      </CardContent>
    </Card>
  );

}
