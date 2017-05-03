'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * MqttUser Schema
 */
var MqttUserSchema = new Schema({
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
    password: {
        type: String
    },
    salt: {
        type: String
    },
    is_superuser: {
        type: Boolean
    }
});

MqttUserSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('MqttUser', MqttUserSchema);