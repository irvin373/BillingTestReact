import { useEffect, useState } from "react";
import { Billing, Client, PostBilling } from "../types/types";

export const url = 'http://localhost:86';
const apiBilling = `${url}/Billing`;
const apiBillingPay = `${url}/Billing/Pay`;
const apiClients = `${url}/Clients`;
let lastQuery = '';

function fetchData(api: string) {
  return fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}

async function postData (api: string, data: PostBilling | {billId: number} ) {
  return await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(data),
  });
}

export function useBilling(query?: string) {
  const [billing, setBilling] = useState<Billing[]>([]);
  const fetchBilling = () => {
    const url = query ? `${apiBilling}?${query}` : apiBilling;
    console.log(url);
    fetchData(url)
      .then(res => res.json())
      .then(data => {
        setBilling(data)
      });
  };
  
  if (lastQuery !== query) {
    lastQuery = query || '';
  }
  useEffect(() => {
    fetchBilling();
  }, [query]);
  return {billing};
}

export function postBilling(data: PostBilling) {
  return postData(apiBilling, data)
    .then(res => res.ok);
}

export function payBilling(billId: number) {
  return postData(apiBillingPay, {billId})
    .then((res) => res.ok);
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    fetchData(apiClients)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);
  return {clients};
}

export {lastQuery};