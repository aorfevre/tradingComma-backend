var helper = require('../helper')
const axios = require('axios')
const {
  v4: uuidv4
} = require('uuid');
var _db = require('../database/mongo_db.js')
var init = require('../../custo/init.js')


module.exports = {
  createAlert: function(req, res, next) {
    try {
      console.log("🟢", "POST", "/alert", req.body, uuidv4());

      _db.set('alert', uuidv4(), req.body, false).then(r => {
        console.log('post ok')

        var bot = init.setTelegram();
        bot.sendMessage(TG_ADMIN, "New alert received")
        init.stopBot(bot)
      })

    } catch (e) {
      console.warn("🔴", 403, "/alert", e);

      res.status(403)
      res.send({
        error: 'Unexpected error'
      })
    }
  },

}