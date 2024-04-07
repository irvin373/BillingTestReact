import { useCallback, useContext } from "react";
import List from "../Organisms/List.component";
import ClientItem from "../Molecules/ClientItem.component";
import { useClients } from '../../services/servicesBilling';
import { Client } from "../../types/types";
import QueryContext from "../../Context/QueryContext.context";

export default function ClientList() {
  const { setClientId, clientId } = useContext(QueryContext);
  const { clients } = useClients();
  // TODO remove useCallback on react 19
  const renderItem = useCallback((item: Client) => {
    const onClickItem = () => {
      if (clientId === item.id.toString()) {
        setClientId('');
      } else {
        setClientId(item.id.toString());
      }
    }
    return (<ClientItem key={item.id} currentClient={clientId} item={item} onClick={onClickItem} />);
  }, [setClientId, clientId])
  return (
    <>
      <List
        listItems={clients}
        renderItem={renderItem}
      />
    </>
  );
}
