'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Telemetry Schema
 */
var TelemetrySchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        index: true
    },
    timestamp: {
        type: Date,
        index: true
    },
    tag: {
        full: {
            type: String,
            index: true
        },
        clientTagCode: {
            type: String,
            index: true
        },
        locationTagCode: {
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
            },
            current: {
                type: Number
            }
        }
    }
});

TelemetrySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    this.tag.full = this.tag.locationTagCode + '_' +
        this.tag.deviceTagCode + '_' +
        this.tag.sensorTagCode;

    next();
});

module.exports = mongoose.model('Telemetry', TelemetrySchema);