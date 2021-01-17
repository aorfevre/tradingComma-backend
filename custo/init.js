"use strict";

const TelegramBot = require('node-telegram-bot-api');
var async = require('async');
module.exports.isAdminAd = function(msg) {
  //console.log("This is a message from the demo package");

  return _isAdmin(msg, myAdminsAd)






}
module.exports.setTelegram = function() {

  var telegramToken = BOT_TOKEN_TELEGRAM_PROD
  global.isDev = __dirname.indexOf("aorfevre") !== -1

  return new TelegramBot(telegramToken, {
    polling: {
      interval: 200,
      limit: 75,
      autoStart: true,
      allowed_updates: ["message", "inline_query", "callback_query"]
    }
  });

}