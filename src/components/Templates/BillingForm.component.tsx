import { ChangeEvent, useContext, useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { ServiceType } from '../../types/types';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { validatePediod } from '../../utils/BillingUtils';
import { postBilling, useClients } from '../../services/servicesBilling';
import SelectService from '../Molecules/SelectService.component';
import QueryContext from '../../Context/QueryContext.context';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type Props = {
  closeModal: () => void;
  clientId: string;
}

export default function BillingForm({clientId, closeModal}: Props) {
  const { handleRefresh } = useContext(QueryContext);
  const [client, setClient] = useState<string>(clientId || '')
  const [serviceType, setServiceType] = useState<ServiceType>('electricity');
  const [amount, setAmount] = useState<number>(0);
  const [period, setPeriod] = useState<string>('');
  const {clients} = useClients();
  const selectedClient = clients.find(item => `${item.id}` === client)?.name;
  const handleService = (event: SelectChangeEvent) => {
    event.preventDefault();
    setServiceType(event.target.value as ServiceType);
  };
  const handleClient = (event: SelectChangeEvent) => {
    event.preventDefault();
    setClient(event.target.value as string);
  };
  const handlePeriod = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setPeriod(event.target.value as ServiceType);
  }

  const handleAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAmount(Number(event.target.value));
  }

  const checkSubmit = () => {
    return client !== '' && validatePediod(period) && amount > 0;
  }

  const submitBilling = async () => {
    try {
      await postBilling({clientId: Number(client), amount, period, serviceType});
      closeModal();
      handleRefresh();
    } catch (error) {
      console.log("error period already exist")
    }
  }
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <SelectService serviceType={serviceType} handleService={handleService} />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="period" required>
          period
        </FormLabel>
        <OutlinedInput
          id="period"
          name="period"
          type="text"
          error={!validatePediod(period) && period !== ''}
          placeholder="select a period period YYYYMM"
          autoComplete="202404"
          onChange={handlePeriod}
          required
          value={period}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <OutlinedInput
          id="amount"
          name="amount"
          type="number"
          placeholder="amount"
          onChange={handleAmount}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="client-select-label">
            {selectedClient || 'Select a Client'}
          </InputLabel>
          <Select
            defaultValue=""
            labelId="client-select-label"
            id="client-select"
            label="Client"
            onChange={handleClient}
          >
            {clients.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </FormGrid>
      <FormGrid item xs={12}>
        <Button
          onClick={submitBilling}
          disabled={!checkSubmit()}
          variant="contained">
            Submit
        </Button>
      </FormGrid>
    </Grid>
  );
}