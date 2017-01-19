'use strict';

var dumydata  = require('./dumydata');

exports.Telemetry = require('./models/telemetry.model');
exports.Sensor    = require('./models/sensor.model');
exports.Device    = require('./models/device.model');
exports.Client    = require('./models/client.model');
exports.Location  = require('./models/location.model');
exports.Asset     = require('./models/asset.model');
exports.Tag       = require('./models/tag.model');
exports.User      = require('./models/user.model');
exports.Message   = require('./models/message.model');

exports.populateDumyData = dumydata.populate;

