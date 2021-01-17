var helper = require('./helper')
var validate = require('express-jsonschema').validate;
var UserController = require('./controllers/userController');


module.exports = function(app) {

  /**
   * @swagger
   * /user:
   *   post:
   *     tags:
   *       - user
   *     description: Create a Firebase user
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *       - in : header
   *         name: Authorization
   *     responses:
   *       201:
   *         description: User created, responds with user datas
   *       204:
   *         description: User already exists. responds with user data
   *       403:
   *         description: Error While creating user
   */
  app.post("/user", UserController.createUser)

}