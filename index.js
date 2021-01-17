const express = require("express");
var admin = require("firebase-admin");
var env = require('./config/env.json')

var serviceAccount = env["FIREBASE_CREDENTIALS"]
bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const app = express()
app.use(bodyParser.json());


const port = env.PORT;
var router = express.Router();

var swaggerUi = require('swagger-ui-express')
var swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'TradComma API',
    version: '1.0.0',
    description: 'REST api generated',
  },
  // host: 'localhost:8080',
  basePath: '/',
  components: {
    securitySchemes: {
      MyUserToken: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  }
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./app/*.js']
};
var swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



require("./app/router")(app);
require("./app/clean-exit");
const port = process.env.PORT || env.PORT;

app.listen(port, () => console.log(`Trading Comma Manager listening on port ${port}!`))