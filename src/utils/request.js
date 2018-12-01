/**
 *  @providesModule utils/request
 */

import Config from './config';

function request(method, url, options = {}) {
  const {
    body,
    fetchConfig,
    timeout
  } = options;
  const requestUrl = `${Config.Host}${url}`;
  const requestBody = Object.assign({
    method,
    headers: {},
    body: body && JSON.stringify(body)
  });
  let promise = fetch(requestUrl, requestBody, fetchConfig)
    .then(response => {
      const {
        status
      } = response;
      if (status >= 200 && status < 300) {
        if (status === 204) {
          return null;
        }
        return response.json().then(result => {
          return result;
        });
      }

      throw Object.assign(new Error(response.statusText), {
        response,
        status
      });
    })
    .catch(err => {
      throw err;
    });
  if (timeout) {
    promise = Promise.race([
      promise,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('timeout'));
        }, timeout);
      })
    ]);
  }
  return promise.catch(e => {
    console.log('e', e)
  });
}

function post(url, options = {}) {
  return request('post', url, options);
}

function get(url, options = {}) {
  return request('get', url, options);
}

export {
  get,
  post
};

export default request;
