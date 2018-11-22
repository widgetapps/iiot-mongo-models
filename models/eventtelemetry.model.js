'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * EventTelemetry Schema
 */
var EventTelemetrySchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        index: true
    },
    timestamp: {
        type: Number,
        index: true
    },
    tag: {
        full: {
            type: String,
            index: true
        },
        clientTagCode: {
            type: String
        },
        locationTagCode: {
            type: String
        },
        assetTagCode: {
            type: String
        },
        sensorTagCode: {
            type: String
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
    event: {
        type: Schema.ObjectId,
        ref: 'Event',
        index: true
    },
    data: {
        unit: {
            type: String
        },
        value: {
            type: String
        }
    }
});

EventTelemetrySchema.index({ timestamp: 1, 'tag.full': 1 });
EventTelemetrySchema.index({ created: 1, 'tag.locationTagCode': 1, 'tag.assetTagCode': 1 });

EventTelemetrySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    this.tag.full = this.tag.locationTagCode + '_' +
        this.tag.assetTagCode + '_' +
        this.tag.sensorTagCode;

    next();
});

module.exports = mongoose.model('EventTelemetry', EventTelemetrySchema);