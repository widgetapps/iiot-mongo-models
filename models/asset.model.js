'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Asset Schema
 */
var AssetSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        index: true
    },
    tagCode: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    settings: [{
        name: {
            type: String
        },
        datatype: {
            type: String,
            enum: ['string', 'int', 'double', 'boolean', 'date'],
            default: 'int'
        },
        range: {},
        value: {}
    }],
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    },
    location: {
        type: Schema.ObjectId,
        ref: 'Location',
        index: true
    }
});

AssetSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Asset', AssetSchema);