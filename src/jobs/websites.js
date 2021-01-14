// config
const { websites } = require('../config/data.config');

// Services 🧰
const Request = require('../services/request.service');
const TelegramBot = require('../services/telegram.service');
const Logger = require('../services/logger.service');

module.exports = async () => {
  const payloads = {
    0: [], // 0 => for down websites ❌
    1: [], // 1 => for up websites  ✔️
  };
  for (const website of websites) {
    const { isUp, status, payload } = await Request[website.method](
      website.url
    );
    payloads[Number(isUp).toString()].push(
      `Host name : ${website.name} - ${
        website.url
      } %0AStatus : ${status} %0AIs Running : ${
        isUp ? 'YES ✔️' : 'NO ❌'
      } %0APayloads Issue : ${JSON.stringify(payload)}%0A
      ----------------------📃---------------------------%0A`
    );
    Logger.create({
      url: website.url,
      method: website.method,
      isUp,
      status,
      payloads,
    });
  }
  TelegramBot.send(
    `Totals : ${payloads[0].length} ❌ - ${
      payloads[1].length
    } ✔️%0AStatistics :%0A
    -----------------------📃---------------------------%0A${payloads[0].join(
      '%0A'
    )}${payloads[1].join('%0A')} %0A`
  );
};
