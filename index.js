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

exports.populateDumyData = dumydata.populate;

// TODO: Need to add a machine collection. This will allow us to tie data to a real asset.
// A machine should be an actual product. Need something like a SKU or UPC code to link to product catalogues.
