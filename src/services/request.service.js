// modules 🗃️
const fetch = require('https');

// config 🏗️
const defaultOptions = require('../config/requests.config');

// Services 🧰
const Logger = require('../services/logger.service');

const Request = {};

/**
 *
 * @param {*} param Object contains
 *                  url     => base url
 *                  method  => GET, POST, PUT, DELETE
 *                  payload => the data that you want to send
 *                  headers => the specifics headers that you want to send
 *
 */

Request.send = ({ url, method, payload, headers }) =>
  new Promise((resolve, reject) => {
    let response = {};
    const { hostname, pathname, search } = new URL(url);
    const req = fetch.request(
      {
        method,
        hostname,
        path: `${pathname}${search}`,
        headers: { ...defaultOptions.headers, ...headers },
      },
      (res) => {
        res.on('data', (data) => {
          try {
            // A dump way to check if the request can be parse as json or not 😅!
            data = JSON.parse(data);
          } catch (err) {}
          response = {
            payload: data,
            status: res.statusCode,
            isUp: res.statusCode < 300,
            method,
            url,
          };
          Logger.create(response);
        });
        res.on('end', () => {
          resolve(response);
        });
      }
    );
    req.on('error', (e) => {
      response = {
        payload: { message: e.message },
        status: -3008,
        isUp: false,
        method,
        url,
      };
      Logger.create(response);
      reject(response);
    });
    if (Object.keys(payload || {})) req.write(JSON.stringify(payload));
    req.end();
  });

/**
 *
 * Get request function
 * @param {*} url => the base url e.i : http://example.com/path || http://example.com 🔗 [Required]
 * @param {*} options =>  other options like headers, payloads, query 💐 [Optional] see [/config/requests.config] 📃
 *
 */
Request.get = async (url, options = { ...defaultOptions }) => {
  try {
    return await Request.send({
      url,
      method: 'GET',
      ...options,
    });
  } catch (err) {
    return err;
  }
};

module.exports = Request;
