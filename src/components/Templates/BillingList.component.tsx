import { useCallback, useContext, useState } from "react";
import List from "../Organisms/List.component";
import BillingItem from "../Molecules/BillingItem.component";
import { useBilling } from '../../services/servicesBilling';
import { Billing } from "../../types/types";
import QueryContext, { buildQuery } from "../../Context/QueryContext.context";
import { Box, Fab, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BillingForm from "./BillingForm.component";

export default function BillingList() {
  const { clientId, isPending, serviceType, refresh } = useContext(QueryContext);
  const { billing } = useBilling(buildQuery({ clientId, isPending, serviceType, refresh }));
  const [open, setOpen] = useState<boolean>(false);
  // TODO remove useCallback on react 19
  const renderItem = useCallback((item: Billing) => {
    return (
      <BillingItem key={item.id} item={item} />
    );
  }, [])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <List
        listItems={billing}
        renderItem={renderItem}
      />
      <div className="fabAdd" onClick={handleOpen}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BillingForm closeModal={handleClose} clientId={clientId} />
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
