"use strict";

/**
 * Config file for a https://github.com/micromata/http-fake-backend to
 * mock the PythonBankBeispiel backend.
 *
 * Just place in ./server/api folder.
 */

const SetupEndpoint = require("./setup/");

const prefix = "/shoppingList";

module.exports = SetupEndpoint({
  name: "shoppingList",
  urls: [
    {
      params: "/groups",
      requests: [
        {
          method: "GET",
          response: "/response-files/shoppingList/groups.json",
        },
        {
          method: ["POST"],
          response: "/response-files/shoppingList/group.json",
        },
      ],
    },
    {
      params: "/groups/{id}",
      requests: [
        {
          method: ["GET"],
          response: "/response-files/shoppingList/group.json",
        },
        {
          method: ["PUT"],
          response: "/response-files/shoppingList/group.json",
        },
        {
          method: "DELETE",
          response: "/response-files/shoppingList/group.json",
        },
      ],
    },
    //    { params: '/groups/{id}/accounts',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/accountsfor1.json'
    //     }, {
    //         method: ['POST'],
    //         response: '/response-files/shoppingList/account.json'
    //     }]
    // }, {
    //     params: '/accounts',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/allaccounts.json'
    //     }]
    // }, {
    //     params: '/accounts/{id}',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/account.json'
    //     },
    //     {
    //         method: ['delete'],
    //         response: {
    //             deleted: true
    //         }
    //     }]
    // }, {
    //     params: '/accounts/{id}/balance',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/balance.json'
    //     }]
    // }, {
    //     params: '/account/{id}/credits',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/creditsfor1.json'
    //     }]
    // }, {
    //     params: '/account/{id}/debits',
    //     requests: [{
    //         method: 'GET',
    //         response: '/response-files/shoppingList/debitsfor1.json'
    //     }]
    // }
  ],
});
