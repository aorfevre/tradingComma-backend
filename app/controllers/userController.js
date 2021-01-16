var helper = require('../helper')
const axios = require('axios')



module.exports = {
  createUser: function(req, res, next) {
    try {
      console.log("🟢", "POST", "/core/user", req.body);



    } catch (e) {
      console.warn("🔴", 500, "/core/user", e);

      res.status(500)
      res.send({
        error: 'Unexpected error'
      })
    }
  },

}