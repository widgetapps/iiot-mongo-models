'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Sensor Schema
 */
var SensorSchema = new Schema({
    created: {
        type: Date,
        required: true
    },
    updated: {
        type: Date
    },
    type: {
        type: String
    },
    unit: {
        type: String
    }
});

SensorSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Sensor', SensorSchema);