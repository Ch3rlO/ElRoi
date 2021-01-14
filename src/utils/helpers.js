// Modules
const { appendFileSync, readdirSync } = require('fs');
const { join } = require('path');

// Config 🔨
const { timeUnits } = require('../config/resources.config');

/**
 *
 * @param {String} duration the duration as string default value is 1 day
 * @returns the time in ms 🕛
 *
 */
const humanFormat2MS = (duration = '1d') => {
  const unit = duration.slice(-1).toLowerCase();
  if (typeof timeUnits[unit] !== 'function')
    throw Error(
      'Whoops, please make sure to provide me with the right time units i.g : 1h, 24m, 5d'
    );
  return timeUnits[unit](duration.replace(/[a-z]/gi, ''))();
};

/**
 *
 * @param {String} path the file path as an Array 🗃️
 * @param {String} data the data the you want to append 😅
 *
 */
const appendIntoFile = (path, data) =>
  appendFileSync(join(...path), data, 'utf-8');

/**
 *
 * @param {*} path the file path 🔗
 * @returns Array of files name 🗃️
 *
 */

const readFiles = (...path) => readdirSync(join(...path));

module.exports = {
  humanFormat2MS,
  appendIntoFile,
  readFiles,
};
