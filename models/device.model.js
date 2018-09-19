'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    md5 = require('md5'),
    crypto = require('crypto');

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
    sensors: [{
        type: Schema.ObjectId,
        ref: 'Sensor',
        index: true
    }],
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
    testmode: {
        type: Boolean,
        default: false
    },
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
    },
    location: {
        type: Schema.ObjectId,
        ref: 'Location',
        index: true
    },
    asset: {
        type: Schema.ObjectId,
        ref: 'Asset',
        index: true
    }
},{
    toObject: {
        virtuals: false
    },
    toJSON: {
        virtuals: false
    }
});

DeviceSchema
    .virtual('mqtt.username')
    .get(function () {
        return md5(this.serialNumber);
    });

DeviceSchema
    .virtual('mqtt.password')
    .get(function () {
        var key = 'R5CYPRvd82keWMsfRDWJ';
        if (process.env.SECRET_KEY_AUTH) {
            key = process.env.SECRET_KEY_AUTH;
        }

        var hmac = crypto.createHmac('md5', key);
        hmac.update(md5(this.serialNumber));

        return hmac.digest('hex');
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