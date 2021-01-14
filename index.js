/**
 *
 * Name : EL Roi 👀
 * Description : A Simple tool to monitor your servers
 * Author : Mustafa (CharlO) Ali 🧑‍🚀
 * Created At : 2021-01-01
 *
 */
require('dotenv').config({ path: '.env' });

// JOBS ⏲️
const initSchedules = require('./src/jobs/index');

// Helpers ⚒️
const { humanFormat2MS } = require('./src/utils/helpers');

(() => {
  console.log(`ElRoi is up & running 🦄`);
  setInterval(initSchedules, humanFormat2MS(process.env.DURATION || '1d'));
})();
