import {baseUrl} from './constants/apiRoutes';
const ES6Promise = require('es6-promise');
ES6Promise.polyfill();
const axios = require('axios');

export const apiUrl = baseUrl;

//base URL.
let instance = axios.create({
  baseURL: apiUrl,
});

//request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error.response);
  },
);

//response interceptor
instance.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  },
);

export default instance;
