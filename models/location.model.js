'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    tagCode: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    geolocation: {
        type: {
            type: String
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    address: {
        street: {
            type: String
        },
        street2: {
            type: String
        },
        city: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: String
        },
        country: {
            type: String
        }
    },
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    },
    assets: {
        type: Schema.ObjectId,
        ref: 'Asset',
        index: true
    }
});

LocationSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Location', LocationSchema);