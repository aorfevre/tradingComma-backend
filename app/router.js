var helper = require('./helper')
var validate = require('express-jsonschema').validate;
var UserController = require('./controllers/userController');


module.exports = function(app) {


  app.all("*", helper.isAuthenticated, UserController.createUser)

}