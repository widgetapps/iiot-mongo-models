'use strict';

var dumydata  = require('./dumydata');

exports.Asset     = require('./models/asset.model');
exports.Alert     = require('./models/alert.model');
exports.Client    = require('./models/client.model');
exports.Device    = require('./models/device.model');
exports.Location  = require('./models/location.model');
exports.Message   = require('./models/message.model');
exports.Sensor    = require('./models/sensor.model');
exports.Tag       = require('./models/tag.model');
exports.Telemetry = require('./models/telemetry.model');
exports.User      = require('./models/user.model');
exports.Mqtt      = require('./models/mqtt.model');

exports.populateDumyData = dumydata.populate;

