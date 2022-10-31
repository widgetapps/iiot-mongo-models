'use strict';

var mongoose = require('mongoose'),
    randomstring = require('randomstring'),
    Sensor    = require('./models/sensor.model'),
    Device    = require('./models/device.model'),
    Asset     = require('./models/asset.model'),
    Tag       = require('./models/tag.model'),
    Location  = require('./models/location.model'),
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
            street: '554 Parkside Drive,',
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
        firstName: 'John',
        lastName: 'Dough',
        email: 'john.dough@example.com',
        password: 'example',
        phone: '5555551234',
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
                    createLocation(clientId);
                }
            );
        }
    });
}

function createLocation(clientId) {
    console.log('Creating location...');

    var currentDate = new Date();

    var location = new Location ({
        created: currentDate,
        tagCode: 'MOBL1',
        description: 'Mobile Unit 1',
        address: {
            street: '554 Parkside Drive,',
            city: 'Waterloo',
            province: 'ON',
            postalCode: 'N2L5Z4',
            country: 'CA'
        },
        client: mongoose.Types.ObjectId(clientId)
    });

    location.save(function(err, loc) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Location created: ' + loc._id);
            createAsset(clientId, loc._id, 'MOBL1');
        }
    });
}

function createAsset(clientId, locationId, locationTag) {
    console.log('Creating asset...');

    var currentDate = new Date();

    var asset = new Asset({
        created: currentDate,
        tagCode: 'ASSET1',
        name: 'Asset 1',
        description: 'This is mobile device #1',
        client: mongoose.Types.ObjectId(clientId),
        location: mongoose.Types.ObjectId(locationId)
    });

    asset.save(function(err, ast) {
        if (err) {
            console.log('Error');
        } else {
            Location.findByIdAndUpdate(
                locationId,
                {$push: {'assets': mongoose.Types.ObjectId(ast._id)}},
                {safe: true, upsert: true, new : true},
                function(err, location) {
                    console.log('Asset created:' + ast._id);
                    createSensors(clientId, locationId, ast._id, locationTag, 'ASSET1');
                }
            );
        }
    });
}

function createSensors(clientId, locationId, assetId, locationTag, assetTag) {
    console.log('Creating sensors...');

    var currentDate = new Date();

    var sensors = [
        {
            created: currentDate,
            tagCode: 'PI',
            type: 1,
            typeString: 'pres',
            description: 'Pressure',
            unit: 'kPa'
        },
        {
            created: currentDate,
            tagCode: 'TI',
            type: 2,
            typeString: 'temp',
            description: 'Tempurature',
            unit: 'celcius'
        },
        {
            created: currentDate,
            tagCode: 'II',
            type: 3,
            typeString: 'curr',
            description: 'Current',
            unit: 'amp'
        },
        {
            created: currentDate,
            tagCode: 'EI',
            type: 4,
            typeString: 'volt',
            description: 'Volts',
            unit: 'v'
        },
        {
            created: currentDate,
            tagCode: 'VXI',
            type: 5,
            typeString: 'aclx',
            description: 'x-axis',
            unit: 'x'
        },
        {
            created: currentDate,
            tagCode: 'VYI',
            type: 6,
            typeString: 'acly',
            description: 'y-axis',
            unit: 'x'
        },
        {
            created: currentDate,
            tagCode: 'VZI',
            type: 7,
            typeString: 'aclz',
            description: 'z-axis',
            unit: 'x'
        },
        {
            created: currentDate,
            tagCode: 'VI',
            type: 8,
            typeString: 'shck',
            description: 'Vibration',
            unit: 'x'
        }
    ];

    Sensor.insertMany(sensors, function(err, docs) {
        if (err) {
            console.log('Error');
        } else {
            console.log('Sensors created.');
            createDevice(docs, clientId, locationId, assetId, locationTag, assetTag);
        }
    });
}

function createDevice(sensors, clientId, locationId, assetId, locationTag, assetTag) {
    console.log('Creating device...');

    var currentDate = new Date();

    var sensorIds = sensors.map(function(sensor) {
        return {
            sensor: mongoose.Types.ObjectId(sensor._id),
            tagCode: sensor.tagCode,
            unit: sensor.unit,
            limits: {
                high: 100,
                low: 0
            }
        };
    });

    console.log(sensorIds);

    var device = new Device({
        created: currentDate,
        serialNumber: 1,
        type: 'machine',
        sensors: sensorIds,
        descriptor: 'Dumy test device',
        client: mongoose.Types.ObjectId(clientId),
        location: mongoose.Types.ObjectId(locationId),
        asset: mongoose.Types.ObjectId(assetId)
    });

    device.save(function (err, device) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Device created: ' + device._id);
            createTag(clientId, device._id, assetId, locationTag, assetTag, sensor.tagCode);
        }
    });
}

function createTag(clientId, deviceId, assetId, locationTag, assetTag, sensorTag) {
    console.log('Creating tag...');

    var currentDate = new Date();

    var tag = new Tag({
        created: currentDate,
        tag: {
            full: locationTag + "_" + assetTag + "_" + sensorTag,
            clientTagCode: 'TERE',
            locationTagCode: locationTag,
            assetTagCode: assetTag,
            sensorTagCode: sensorTag
        },
        active: true,
        activeStart: currentDate,
        client: clientId,
        device: deviceId,
        asset: assetId
    });

    tag.save(function (err, t) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Tag created: ' + t._id);
        }
    });
}
