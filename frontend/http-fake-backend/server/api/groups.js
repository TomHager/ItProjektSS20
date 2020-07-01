'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'groups',
    urls: [
        {
            params: '/list',
            requests: [{
                method: 'GET',
                response: {{'ok}}
            }]
        }
    ]
});
