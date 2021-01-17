"use strict";

process.env["NTBA_FIX_319"] = 1;

var global_config = require('./global_config.js')
var async = require('async');
var fs = require('fs');

var _db = require('./app/database/mongo_db.js')
_db.init();