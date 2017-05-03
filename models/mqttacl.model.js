'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * MqttAcl Schema
 */
var MqttAclSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    clientid: {
        type: String
    },
    publish: {
        type: [String]
    },
    subscribe: {
        type: [String]
    },
    subpub: {
        type: [String]
    }
});

MqttAclSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('MqttAcl', MqttAclSchema);