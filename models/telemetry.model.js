'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Device Schema
 */
var TelemetrySchema = new Schema({
    created: {
        type: Date,
        index: true,
        required: true
    },
    timestamp: {
        type: Date,
        index: true
    },
    tag: {
        clientTagCode: {
            type: String,
            index: true
        },
        deviceTagCode: {
            type: String,
            index: true
        },
        sensorTagCode: {
            type: String,
            index: true
        }
    },
    device: {
        type: Schema.ObjectId,
        ref: 'Device',
        index: true
    },
    sensor: {
        type: Schema.ObjectId,
        ref: 'Sensor',
        index: true
    },
    data: {
        unit: {
            type: String
        },
        quality: {
            type: Number
        },
        values :{
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            average: {
                type: Number
            }
        }
    }
});

DeviceSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Telemetry', TelemetrySchema);