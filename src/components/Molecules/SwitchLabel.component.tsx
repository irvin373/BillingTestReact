import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type Props = {
  isPending: boolean;
  labelActivated: string;
  labelDeactivated: string;
  onChange?: (activated: boolean) => void;
};

export default function SwitchLabel({isPending, labelActivated, labelDeactivated, onChange}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  }
  return (
    <FormControlLabel
      sx={isPending ? {color: 'error.main'} : {color: 'success.main'}}
      control={<Switch checked={isPending} onChange={handleChange} />}
      label={isPending ? labelActivated : labelDeactivated} />
  );
}