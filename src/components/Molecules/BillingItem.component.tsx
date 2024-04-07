import React, {useCallback, useContext} from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Billing } from "../../types/types";
import { Button } from '@mui/material';
import { formatCurrency } from '../../utils/BillingUtils';
import { payBilling } from '../../services/servicesBilling';
import QueryContext from '../../Context/QueryContext.context';

type Props = {
  item: Billing;
  onClick?: () => void;
};

export default function BillingItem({ item, onClick }: Props) {
  // TODO remove useCallback on react 19
  const { handleRefresh } = useContext(QueryContext);

  const payBillingBtn = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    payBilling(item.id).then(() => {
      handleRefresh();
    });
  }, [item])
  return (<>
      <ListItem sx={{ alignItems: 'center', gap: 2 }} alignItems="flex-start" onClick={onClick}>
        <ListItemText
          primary={item.serviceType}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`${item.period} • `}
              </Typography>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color={item.state === 'paid' ? 'success.main' : 'error.main'}
              >
                {item.state}
              </Typography>
            </React.Fragment>
          }
        />
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="h5"
            color="text.primary"
          >
            {formatCurrency(item.amount)}
          </Typography>
          <Button onClick={payBillingBtn} variant="contained">Pay</Button>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>);
}
