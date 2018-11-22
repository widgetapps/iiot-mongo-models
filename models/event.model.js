'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        index: true
    },
    updated: {
        type: Date
    },
    start: {
        type: Date,
        index: true
    },
    end: {
        type: Date,
        index: true
    },
    count: {
        type: Number
    },
    description: {
        type: String
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
    asset: {
        type: Schema.ObjectId,
        ref: 'Asset',
        index: true
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
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    }
});

EventSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Event', EventSchema);