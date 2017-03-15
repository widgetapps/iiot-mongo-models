'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    apikey: {
        id: {
            type: String,
            index: true
        },
        secret: {
            type: String
        }
    },
    tagCode: {
        type: String,
        index: true
    },
    companyName: {
        type: String
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
    contact: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    },
    alertGroups: [{
        code: {
            type: String
        },
        name: {
            type: String
        },
        contacts: [{
            name: {
                type: String
            },
            sms: {
                send: {
                    type: Boolean
                },
                number: {
                    type: String
                }
            },
            email: {
                send: {
                    type: Boolean
                },
                address: {
                    type: String
                }
            },
            user: {
                send: {
                    type: Boolean
                },
                id: {
                    type: Schema.ObjectId,
                    ref: 'User',
                    index: true
                }
            }
        }]
    }],
    preferences: {
        messaging: {
            frequencyMinutes: {
                type: Number
            }
        }
    },
    reseller: {
        type: Boolean,
        default: false
    },
    resellerParent: {
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    },
    resellerClients: [{
        type: Schema.ObjectId,
        ref: 'Client',
        index: true
    }],
    locations: [{
        type: Schema.ObjectId,
        ref: 'Location',
        index: true
    }],
    assets: [{
        type: Schema.ObjectId,
        ref: 'Asset',
        index: true
    }],
    devices: [{
        type: Schema.ObjectId,
        ref: 'Device',
        index: true
    }],
    users: [{
        type: Schema.ObjectId,
        ref: 'User',
        index: true
    }]
});

ClientSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    next();
});

module.exports = mongoose.model('Client', ClientSchema);