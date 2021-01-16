  var env = require('../config/env.json')
  const fs = require('fs');
  var admin = require("firebase-admin");
  var helper = this;
  const axios = require('axios')
  var moment = require('moment');
  const {
    logger
  } = require('bs-logger');


  module.exports = {
    getUserConnected: function(req) {
      const jwttoken = req.headers.authorization
      return admin.auth().verifyIdToken(jwttoken)
    },
    transformTokenToUser: function(u, body) {
      try {

        if (u.uid === undefined || u.email === undefined || u.email_verified === undefined || u.firebase.sign_in_provider === undefined) {
          return {
            error: 'Casting error - Missing datas'

          }
        } else if (body.type === undefined || body.type === null) {
          return {
            error: 'user type can not be null'

          }
        }


        let firstname = u.name;
        let lastname = null;

        if (u.name.indexOf(' ') > -1) {
          firstname = u.name.split(' ')[0]
          lastname = u.name.split(' ')[1]
        }

        return {
          pub_key: body.pub_key,
          firebase_uid: u.uid,
          provider: u.firebase.sign_in_provider,
          firstname: firstname,
          lastname: lastname,
          nickname: firstname,
          is_corp: false,
          company_name: null,
          company_address: null,
          company_number: null,
          birth_date: moment().format('YYYY-MM-DD'),
          desc: null,
          email: u.email,
          email_verified: u.email_verified,
          phone: u.phone || '',
          photo_url: u.picture || '',
          type: body.type
        }
      } catch (e) {
        return {
          error: 'Casting user - ' + e

        }
      }
    },
    isAuthenticated: function(req, res, next) {
      if (req.headers.authorization !== undefined) {
        const jwttoken = req.headers.authorization
        admin.auth().verifyIdToken(jwttoken)
          .then(function(decodedToken) {
            let uid = decodedToken.uid;
            next()

          })
          .catch(e => {
            res.status(403).send({
              status: 'unauthorized',
              error: e,
              code: 403
            });
          });
      } else {
        res.status(403).send({
          status: 'unauthorized',
          code: 403
        });
      }

      //     admielse{n.auth().verifyIdToken(idToken)
      // .then(function(decodedToken) {
      //   let uid = decodedToken.uid;
      //   // ...
      // }).catch(function(error) {
      //   // Handle error
      // });
    },


  }