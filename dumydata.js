'use strict';

var mongoose = require('mongoose'),
    randomstring = require('randomstring'),
    Telemetry = require('./models/telemetry.model'),
    Sensor    = require('./models/sensor.model'),
    Device    = require('./models/device.model'),
    Client    = require('./models/client.model'),
    User      = require('./models/user.model');

mongoose.Promise = global.Promise;

exports.populate = function() {
    console.log('Starting pre-pop...');
    populate();
    console.log('Data pre-populated.');
};

function populate() {
    createClient();
}

function createClient() {
    console.log('Creating client...');

    var client = new Client({
        tagCode: 'TERE',
        companyName: 'Terepac Corporation',
        address: {
            street1: '554 Parkside Drive,',
            city: 'Waterloo',
            province: 'ON',
            postalCode: 'N2L5Z4',
            country: 'CA'
        },
        contact: {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@example.com',
            phone: '4168765432'
        },
        users: []
    });

    client.apikey.id = randomstring.generate({
        length: 32,
        charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+;":,.<>/?'
    });

    client.apikey.secret = randomstring.generate({
        length: 30,
        charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+;":,.<>/?'
    });

    client.save(function (err, client) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Client created: ' + client._id);
            createUser(client._id);
        }
    });
}

function createUser(clientId) {
    console.log('Creating user...');

    var user = new User({
        firstName: 'Darryl',
        lastName: 'Patterson',
        email: 'darryl.patterson@terepac.com',
        password: 'terepac',
        phone: '4167866116',
        active: true
    });
    user.provider = 'local';
    user.client = clientId;
    user.save(function (err, user) {
        if (err) {
            console.log('Error');
        } else {
            Client.findByIdAndUpdate(
                clientId,
                {$push: {'users': mongoose.Types.ObjectId(user._id)}},
                {safe: true, upsert: true, new : true},
                function(err, client) {
                    console.log('User created:' + user._id);
                    createSensors(clientId);
                }
            );
        }
    });
}

function createSensors(clientId) {
    console.log('Creating sensors...');

    var currentDate = new Date();

    var sensors = [
        {
            created: currentDate,
            tagCode: 'PI',
            type: 'pres',
            description: 'Pressure',
            unit: 'kPa'
        },
        {
            created: currentDate,
            tagCode: 'TI',
            type: 'temp',
            description: 'Tempurature',
            unit: 'celcius'
        },
        {
            created: currentDate,
            tagCode: 'VXI',
            type: 'aclx',
            description: 'x-axis',
            unit: ''
        },
        {
            created: currentDate,
            tagCode: 'VYI',
            type: 'acly',
            description: 'y-axis',
            unit: ''
        },
        {
            created: currentDate,
            tagCode: 'VZI',
            type: 'aclz',
            description: 'z-axis',
            unit: ''
        },
        {
            created: currentDate,
            tagCode: 'VI',
            type: 'shck',
            description: 'Vibration',
            unit: ''
        }
    ];

    Sensor.insertMany(sensors, function(err, docs) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Sensors created.');
            createDevice(docs, clientId);
        }
    });
}

function createDevice(sensors, clientId) {
    console.log('Creating device...');

    var sensorIds = sensors.map(function(sensor) {
        return sensor._id;
    });

    var device = new Device({
        serialNumber: 1,
        type: 'machine',
        sensors: sensorIds,
        tagCode: 'DV0001',
        tagLocation: 'MOBL',
        descriptor: 'Dumy test device',
        client: mongoose.Types.ObjectId(clientId)
    });

    device.save(function (err, device) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Device created: ' + device._id);
        }
    });
}
