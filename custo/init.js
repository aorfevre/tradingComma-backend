"use strict";

const TelegramBot = require('node-telegram-bot-api');
var async = require('async');
module.exports.isAdminAd = function(msg) {
  //console.log("This is a message from the demo package");

  return _isAdmin(msg, myAdminsAd)






}
module.exports.stopBot = function(bot) {
  if (bot.isPolling()) {
    bot.stopPolling()
  } else if (bot.hasOpenWebHook()) {
    bot.closeWebHook()
  }
}

module.exports.setTelegram = function() {

  var telegramToken = BOT_TOKEN_TELEGRAM_PROD
  global.isDev = __dirname.indexOf("aorfevre") !== -1


  var bot = null;
  if (!isDev) {
    // if (false) {
    const options = {

      webHook: {
        // Just use 443 directly
        port: 443
      }
    };
    var url = 'https://tradcommas-api-dwja7wuiva-ew.a.run.app'
    // url = 'https://api.telegram.org'
    bot = new TelegramBot(telegramToken, options);
    bot.setWebHook(`${url}/bot${telegramToken}`);

    bot.on('webhook_error', (error) => {
      console.log("Webhook error", error.code, error); // => 'EPARSE'
    });
  } else {
    const options = {
      polling: {
        autoStart: true,
        allowed_updates: ["message", "inline_query", "callback_query"]
      },

    };
    bot = new TelegramBot(telegramToken, {
      polling: true
    });
  }
  return bot;
  // return new TelegramBot(telegramToken, {
  //   polling: {
  //     interval: 200,
  //     limit: 75,
  //     autoStart: true,
  //     allowed_updates: ["message", "inline_query", "callback_query"]
  //   }
  // });

}