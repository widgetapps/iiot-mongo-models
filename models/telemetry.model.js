'use strict';

/**
 * Module dependencies.
 * The Asset & Device IDs makes this data tied to the combo.
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
        assetTagCode: {
            type: String,
            index: true
        },
        sensorTagCode: {
            type: String,
            index: true
        }
    },
    asset: {},
    device: {},
    sensor: {},
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
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