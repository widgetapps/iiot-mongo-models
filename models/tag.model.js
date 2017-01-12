'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Tag Schema
 * An entry is added to this collection every time a device is added to an asset.
 * When the device is removed, the activeDates field is updated & currentStart is nulled.
 */
var TagSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    tag: {
        type: String
    },
    active: {
        type: Boolean
    },
    activeStart: {
        type: Date
    },
    historical: [{
        start: {
            type: Date
        },
        end: {
            type: Date
        }
    }]
});

TagSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Tag', TagSchema);