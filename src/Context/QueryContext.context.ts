import {createContext, Dispatch} from 'react';

type Query = {
  clientId: string;
  isPending: boolean;
  serviceType: string;
  refresh: boolean;
  handleRefresh: () => void;
  setClientId: Dispatch<React.SetStateAction<string>>;
  setServiceType: Dispatch<React.SetStateAction<string>>;
}

const QueryContext = createContext<Query>({
  clientId: '',
  isPending: true,
  serviceType: '',
  setClientId: () => {},
  setServiceType: () => {},
  refresh: false,
  handleRefresh: () => {},
});

export function buildQuery({clientId, isPending, serviceType, refresh}: Partial<Query>): string {
  const status = isPending ? 'pending' : 'paid';
  let query = '';
  if(clientId) {
    query += `ClientId=${clientId}&`;
  }
  if (serviceType) {
    query += `ServiceType=${serviceType}&`;
  }
  return `${query}ServiceState=${status}&refresh=${refresh}`;
}


export default QueryContext;