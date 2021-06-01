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
