var helper = require('../helper')
const axios = require('axios')
const uuid = require('uuid')
var _db = require('./app/database/mongo_db.js')



module.exports = {
  createAlert: function(req, res, next) {
    try {
      console.log("🟢", "POST", "/alert", req.body);
      _db.set('alert', uuid(), req.body.text, false).then(r => {
        console.log('r', req.body)
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