var helper = require('../helper')
const axios = require('axios')
var _db = require('../database/mongo_db.js')



module.exports = {
  createUser: function(req, res, next) {
    try {
      console.log("🟢", "POST", "/user", req.body);
      helper.getUserConnected(req).then(u => {
        const userTmp = helper.transformTokenToUser(u, req.body);
        _db.find('user', {
          _id: userTmp.firebase_uid
        }, null, true).then(count => {
          console.log("count user", count)
          if (count === 0) {
            _db.set('user', userTmp.firebase_uid, userTmp, false).then(r => {
              res.status(201)
              res.send(userTmp)
            })
          } else {
            res.status(204)
            res.send(userTmp)
          }
        })


      })
    } catch (e) {
      console.warn("🔴", 403, "/user", e);

      res.status(403)
      res.send({
        error: 'Unexpected error'
      })
    }
  },

}