import axios from 'axios';
/**
 * Calls API at given endpoint with specified settings
 * @async
 * @param {string} endpoint - endpoint name
 * @param {object} settings - request settings
 */

const API_URL = 'http://192.168.1.2:8080';

async function callApi(endpoint, settings, apiUrl = API_URL) {
  try {
    const apiConfig = {
      ...settings,
      url: `${apiUrl}/${endpoint}`,
      validateStatus: status => status >= 200 && status < 300,
    };

    apiConfig.headers = {
      'Content-Type': 'application/json',
      ...apiConfig.headers,
    };

    const response = await axios(apiConfig);

    return Promise.resolve(response);
  } catch (error) {
    const { status } = error.response;
    console.log(status);

    return Promise.reject(error);
  }
}

export const CALL_API = Symbol('Call API');

export default () => next => (action) => {
  const settings = action[CALL_API];

  if (typeof settings === 'undefined') {
    return next(action);
  }

  const {
    url,
    endpoint,
    types,
    ...data
  } = settings;
  const [requestType, successType, errorType] = types;
  next({ type: requestType });

  return callApi(endpoint, data, url).then(
    response => next({ response, type: successType }),
    response => next({ response, type: errorType }),
  );
};
