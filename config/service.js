/* eslint-disable no-alert */
import axios from '../axiosConfig';
import {NavigationActions} from 'react-navigation';
import NavigationService from '../navigation/navigationService';
import NetInfo from '@react-native-community/netinfo';

//axios.defaults.baseURL = baseUrl + '/api/';

export async function callApi(authOptions) {
  const returnVal = {};
  let responsecode = {};

  const state = await NetInfo.fetch();
  state?.isConnected
    ? await axios(authOptions)
        .then((res) => {
          returnVal.response_type = 'success';
          returnVal.response = res;
          responsecode = returnVal;
        })
        .catch((error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            error?.response?.status === 403
              ? alert('Session expire!!')
              : alert('Unauthorized User!!');
            NavigationService.reset({
              key: null,
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
            });
          } else {
            returnVal.response_type = 'fail';
            returnVal.response = error?.response ?? {
              message: 'Network error',
            };
            responsecode = returnVal;
          }
        })
    : (alert('Oops! Check your internet connection and try again'),
      (responsecode = {
        response_type: 'fail',
        response: 'Oops! Check your internet connection and try again',
      }));

  return responsecode;
}

export const apiRequest = ({apiUrl, method, payload, token = ''}) => {
  let authOptions = {
    method: method,
    url: `/api${apiUrl}`,
    data: payload,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    json: true,
  };
  if (method === 'GET') {
    authOptions = {
      method: method,
      url: `/api${apiUrl}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      json: true,
    };
  }
  return callApi(authOptions);
};
