// config 🏗️
const defaultOptions = require('../config/requests.config');

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
    const { protocol, hostname, pathname, search } = new URL(url);
    const req = require(protocol.slice(0, -1)).request(
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
          } catch (err) {
            data = 'HTML RESPONSE';
          }
          response = {
            payload: data,
            status: res.statusCode,
            isUp: res.statusCode < 300,
          };
        });
        res.on('end', () => {
          resolve(response);
        });
      }
    );
    req.on('error', (e) => {
      reject({
        payload: { message: e.message },
        status: e.errno,
        isUp: false,
      });
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
