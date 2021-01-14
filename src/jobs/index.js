const Websites = require('./websites');

module.exports = () => Promise.all([Websites()]);
