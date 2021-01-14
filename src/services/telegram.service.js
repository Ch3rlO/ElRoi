const { API_TOKEN, CHAT_ID } = process.env;

// Services 🧰
const Request = require('../services/request.service');

const TelegramBot = {};

TelegramBot.send = async (message) => {
  await Request.get(
    `https://api.telegram.org/bot${API_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`
  );
};

module.exports = TelegramBot;
