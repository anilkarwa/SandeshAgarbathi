import {apiURL} from '../constants/apiRoutes';
import {apiRequest} from '../config/service';

export const emailCustomerInvoice = (payload) => {
  return apiRequest({
    apiUrl: `${apiURL.EMAILINVOICE}`,
    method: 'POST',
    payload: payload.data,
  });
};
