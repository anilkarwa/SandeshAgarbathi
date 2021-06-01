import {apiURL} from '../constants/apiRoutes';
import {apiRequest} from '../config/service';

export const userLogin = (payload) => {
  return apiRequest({
    apiUrl: `${apiURL.LOGIN}?email=${payload.email}&password=${payload.password}`,
    method: 'GET',
  });
};
