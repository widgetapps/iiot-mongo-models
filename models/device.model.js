'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Device Schema
 */
var DeviceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    serialNumber: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    type: {
        type: String,
        enum: ['hydrant','machine'],
        required: true
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
    sensors: [{
        sensor: {
            type: Schema.ObjectId,
            ref: 'Sensor',
            index: true
        },
        tagCode: {
            type: String
        },
        unit: {
            type: String
        },
        limits: {
            high: {
                type: Number
            },
            low: {
                type: Number
            }
        }
    }],
    tagLocation: {
        type: String
    },
    tagCode: {
        type: String
    },
    descriptor: {
        type: String
    },
    testmode: {
        type: Boolean,
        default: false
    },
    settings: {},
    acl: [{
        client: {
            type: Schema.ObjectId,
            ref: 'Client'
        },
        scope: {
            type: String,
            enum: ['system','user'],
            default: 'system'
        },
        permission: {
            type: String,
            enum: ['r','w']
        }
    }],
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    }
});

DeviceSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Device', DeviceSchema);