import {apiURL} from '../constants/apiRoutes';
import {apiRequest} from '../config/service';

export const getCustomers = () => {
  return apiRequest({
    apiUrl: `${apiURL.CUSTOMER}`,
    method: 'GET',
  });
};

export const getItems = () => {
  return apiRequest({
    apiUrl: `${apiURL.ITEM}`,
    method: 'GET',
  });
};

export const getCustomerGroups = () => {
  return apiRequest({
    apiUrl: `${apiURL.CUSTOMERGROUPS}`,
    method: 'GET',
  });
};

export const createCustomer = (customers) => {
  return apiRequest({
    apiUrl: `${apiURL.SAVECUSTOMER}`,
    method: 'POST',
    payload: customers,
  });
};

export const updateCustomer = (customers) => {
  return apiRequest({
    apiUrl: `${apiURL.UPDATECUSTOMER}`,
    method: 'POST',
    payload: customers,
  });
};

export const deleteCustomer = (customers) => {
  return apiRequest({
    apiUrl: `${apiURL.CUSTOMER}`,
    method: 'POST',
    payload: customers,
  });
};

export const invoiceList = (data) => {
  return apiRequest({
    apiUrl: `${apiURL.INVOICELIST}?prefix=${data.prefix}`,
    method: 'GET',
  });
};

export const saveInvoices = (invoices) => {
  return apiRequest({
    apiUrl: `${apiURL.SAVEINVOICE}`,
    method: 'POST',
    payload: invoices,
  });
};
