const { appendIntoFile } = require('../utils/helpers');

const Logger = {};

Logger.create = (data) => {
  try {
    appendIntoFile(
      [
        __dirname,
        '..',
        'loggers',
        `${new Date().toLocaleDateString().replace(/\//g, '')}-logger.log`,
      ],
      Logger.format(data)
    );
  } catch (err) {
    throw Error(
      'Whoops, please check if there is any folder with name [loggers] in side [src] folder 😊'
    );
  }
};

Logger.format = ({ method, url, status, isUp }) =>
  `${method} -- ${url} -- STATUS : ${status} -- IS UP : ${isUp}\n`;

module.exports = { create: Logger.create };
