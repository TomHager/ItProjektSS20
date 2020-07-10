'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonIKaufBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup');

const prefix = "/iKauf"

module.exports = SetupEndpoint({
    name: 'iKauf',
    urls: [{
        params: '/entries',
        requests: [{
            method: 'GET',
            response: '/response-files/entries.json'
        },
        {
            method: ['POST'],
            response: '/response-files/entry.json'
        }]
    }, {
        params: '/entry/${id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/entry.json'
        }, {
            method: ['PUT'],
            response: '/response-files/entry.json'
        }, {
            method: ['DELETE'],
            response: '/response-files/entry.json'
        }]
    }, {
        params: '/groups',
        requests: [{
            method: 'GET',
            response: '/response-files/groups.json'
        },
        {
            method: ['POST'],
            response: '/response-files/group.json'
        }]
    }, {
        params: '/group/${id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/group.json'
        }, {
            method: ['PUT'],
            response: '/response-files/group.json'
        }, {
            method: ['DELETE'],
            response: '/response-files/group.json'
        }]
    // }, {
    //     params: '/favorites',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/favorite.json'
    //     },
    //     {
    //         method: ['POST'],
    //         response: '/response-files/favorite.json'
    //     }]
    // }, {
    //     params: '/favorite/${id}',
    //     requests: [{
    //         method: ['GET'],
    //         response: '/response-files/favorite.json'
    //     }, {
    //         method: ['PUT'],
    //         response: '/response-files/favorite.json'
    //     }, {
    //         method: ['DELETE'],
    //         response: '/response-files/favorite.json'
    //     }]
    }
]
});