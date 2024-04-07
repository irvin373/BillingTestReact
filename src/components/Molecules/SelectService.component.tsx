import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ServiceType } from "../../types/types";

type Props = {
  serviceType: ServiceType;
  handleService: (event: SelectChangeEvent) => void;
}

export default function SelectService({serviceType, handleService}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="service-select-label">Service</InputLabel>
      <Select
        defaultValue=""
        labelId="service-select-label"
        id="service-select"
        value={serviceType}
        label="Service"
        onChange={handleService}
      >
        <MenuItem value={'electricity'}>Electricity</MenuItem>
        <MenuItem value={'water'}>Water</MenuItem>
        <MenuItem value={'sewer'}>Sewer</MenuItem>
      </Select>
    </FormControl>    
  )
}


