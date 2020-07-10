"use strict";

/**
 * Config file for a https://github.com/micromata/http-fake-backend to
 * mock the PythonBankBeispiel backend.
 *
 * Just place in ./server/api folder.
 */

const SetupEndpoint = require("./setup");

const prefix = "/iKauf";

module.exports = SetupEndpoint({
    name: "iKauf",
    urls: [
        {
            params: "/entry",
            requests: [
                {
                    method: "GET",
                    response: "/response-files/entry.json",
                },
                {
                    method: ["POST"],
                    response: "/response-files/entry.json",
                },
            ],
        },
        {
            params: "/entry/${id}",
            requests: [
                {
                    method: ["GET"],
                    response: "/response-files/entry.json",
                },
                {
                    method: ["PUT"],
                    response: "/response-files/entry.json",
                },
            ],
        },
    ],
});
