'use strict';

var dumydata  = require('./dumydata');

exports.Telemetry = require('./models/telemetry.model');
exports.Sensor    = require('./models/sensor.model');
exports.Device    = require('./models/device.model');
exports.Client    = require('./models/client.model');
exports.User      = require('./models/user.model');

exports.populateDumyData = dumydata.populate;
