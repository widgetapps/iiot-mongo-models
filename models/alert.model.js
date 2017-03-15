'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Alert Schema
 */
var AlertSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        index: true
    },
    asset: {
        type: Schema.ObjectId,
        ref: 'Asset',
        index: true
    },
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    },
    sensor: {
        type: Schema.ObjectId,
        ref: 'Sensor',
        index: true
    },
    limits: {
        low: {
            type: Number
        },
        high: {
            type: Number
        }
    },
    lastValue: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    alertGroupCodes: [{
        type: String
    }],
    frequencyMinutes: {
        type: Number
    },
    lastSent: {
        type: Date
    }
});

AlertSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Alert', AlertSchema);