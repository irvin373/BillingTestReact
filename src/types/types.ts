export type ServiceType = 'water' | 'electricity' | 'sewer';
export type StateService = 'pending' | 'paid';

export type Billing = {
  id: number;
  serviceType: ServiceType;
  period: string;
  amount: number;
  client: {
    id: number;
    name: string;
  };
  state: StateService;
};

export type PostBilling = {
  serviceType: ServiceType;
  period: string;
  amount: number;
  clientId: number;
};

export type Client = {
  id: number;
  name: string;
};
