/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import config from './urls';

const objectToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');

const doRequest = (path, params, method, token) => {
  const options = { method, headers: {} };
  // convert the object to params
  params
    ? method === 'GET'
      ? // eslint-disable-next-line no-param-reassign
        (path += `?${objectToQueryString(params)}`)
      : (options.body = params)
    : (options.body = params);

  // headers

  if (token) {
    options.headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `JWT ${token.accessToken}`,
      rftoken_id: token.rftoken_id,
    });
  } else {
    options.headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }
  return fetch(config.url + path, options).then((response) => {
    if (response.status === 204) {
      return undefined;
    }
    return response.json().then((result) => result);
  });
};

const get = (path, params, token) => doRequest(path, params, 'GET', token);

const post = (path, params, token) => doRequest(path, params, 'POST', token);

const remove = (path, params, token) =>
  doRequest(path, params, 'DELETE', token);
export default {
  get,
  post,
  remove,
};
