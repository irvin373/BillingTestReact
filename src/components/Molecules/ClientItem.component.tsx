import { ListItem, ListItemText, Card, CardContent } from "@mui/material";
import {Person} from '@mui/icons-material';
import SvgIcon from '@mui/material/SvgIcon';
import { Client } from "../../types/types";

type Props = {
  item: Client;
  onClick: () => void;
  currentClient: string;
};

export default function ClientItem({ item, onClick, currentClient }: Props) {
  const isCurrentClient = currentClient === item.id.toString();
  return (
    <ListItem key={item.id} sx={{ py: 1, px: 0 }} onClick={onClick}>
      <Card sx={{backgroundColor: isCurrentClient ? 'primary.main' : 'background.paper',}} variant={isCurrentClient ? "outlined" : "elevation"}>
        <CardContent sx={styles.cardContent}>
          <SvgIcon component={Person} data-testid="PersonIcon" />
          <ListItemText
            sx={{ mr: 2, marginLeft: 1, color: isCurrentClient ? 'background.paper' : 'text.primary'}}
            primary={item.name}
          />
        </CardContent>
      </Card>
    </ListItem>
  );
}

const styles = {
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};
