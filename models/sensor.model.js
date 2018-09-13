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
        default: Date.now
    },
    updated: {
        type: Date
    },
    tagCode: {
        type: String,
        index: true,
        unique: true
    },
    type: {
        type: Number,
        index: true,
        unique: true
    },
    typeString: {
        type: String
    },
    description: {
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