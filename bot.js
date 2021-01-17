"use strict";

process.env["NTBA_FIX_319"] = 1;

var global_config = require('./global_config.js')
var async = require('async');
var fs = require('fs');

var _db = require('./app/database/mongo_db.js')
var init = require('./custo/init.js')


global.bot = init.setTelegram();
_db.init();

// messages.
bot.on('message', (msg) => {
  console.log('msg', msg)
  // send a message to the chat acknowledging receipt of their message
});