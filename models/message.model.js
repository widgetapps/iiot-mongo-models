'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        index: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['normal', 'warning', 'alert'],
        default: 'normal'
    },
    viewed: {
        isViewed: {
            type: Boolean,
            default: false
        },
        when: {
            type: Date
        }
    },
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        index: true
    },
    source: {
        collection: {
            type: String
        },
        id: {
            type: Schema.ObjectId
        }
    }
});

MessageSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Message', MessageSchema);