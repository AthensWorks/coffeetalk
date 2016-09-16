'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

var mockData = {
    "users": [
        {
            "name": "Betty",
            "email": "betty@example.com",
            "availabilities": [
                "morning",
                "afternoon"
            ]
        },
        {
            "name": "David",
            "email": "dave@example.com",
            "availabilities": [
                "morning"
            ]
        },
        {
            "name": "Jon",
            "email": "jon@example.com",
            "availabilities": []
        },
        {
            "name": "Sara",
            "email": "betty@example.com",
            "availabilities": [
                "morning",
                "afternoon"
            ]
        },
        {
            "name": "Mark",
            "email": "dave@example.com",
            "availabilities": [
                "morning"
            ]
        },
        {
            "name": "Rahool",
            "email": "jon@example.com",
            "availabilities": [
                "morning",
                "afternoon"
            ]
        },
        {
            "name": "Saltaroe",
            "email": "betty@example.com",
            "availabilities": [
                "morning",
                "afternoon"
            ]
        },
        {
            "name": "Jenny",
            "email": "dave@example.com",
            "availabilities": [
                "morning"
            ]
        },
        {
            "name": "Sam",
            "email": "jon@example.com",
            "availabilities": []
        },
        {
            "name": "Skrillex",
            "email": "betty@example.com",
            "availabilities": [
                "morning",
                "afternoon"
            ]
        },
        {
            "name": "Aaa",
            "email": "dave@example.com",
            "availabilities": [
                "afternoon"
            ]
        },
        {
            "name": "Yo-Yo Ma",
            "email": "jon@example.com",
            "availabilities": [
                "afternoon"
            ]
        }
    ],
    "lastUpdate": "today"
};
var availabilities = ["morning", "afternoon"];

server.route({
    method: 'GET',
    path: '/just-morning',
    handler: function (request, reply) {
        
        var people = mockData.users.filter((user) => {
            return user.availabilities.length == 1 && user.availabilities.includes("morning");
        });
        
        reply(people);
    }
});

server.route({
    method: 'GET',
    path: '/morning',
    handler: function (request, reply) {
        
        var people = mockData.users.filter((user) => {
            return user.availabilities.includes("morning");
        });
        
        reply(people);
    }
});

server.route({
    method: 'GET',
    path: '/just-afternoon',
    handler: function (request, reply) {
        
        var people = mockData.users.filter((user) => {
            return user.availabilities.length == 1 && user.availabilities.includes("afternoon");
        });
        
        reply(people);
    }
});

server.route({
    method: 'GET',
    path: '/afternoon',
    handler: function (request, reply) {
        
        var people = mockData.users.filter((user) => {
            return user.availabilities.includes("afternoon");
        }).map((user) => {
            return user.name;
        });
        
        reply(people);
    }
});

server.route({
    method: 'GET',
    path: '/both',
    handler: function (request, reply) {
        
        var people = mockData.users.filter((user) => {
            return user.availabilities.length == 2 && user.availabilities.includes("morning") && user.availabilities.includes("afternoon");
        });
        
        reply(people);
    }
});

server.route({
    method: 'GET',
    path: '/pairs',
    handler: function (request, reply) {
        
        var pairs = [];
        var sadPeople = [];
        
        // People only available in the morning
        
        var justMorningPeople = mockData.users.filter((user) => {
            return user.availabilities.length == 1 && user.availabilities.includes("morning");
        });
        
        for (var i = 1; i < justMorningPeople.length; i += 2) {
            pairs.push([ justMorningPeople[i - 1], justMorningPeople[i] ]);
        }
        
        if (justMorningPeople.length % 2 == 1) {
            sadPeople.push(justMorningPeople[justMorningPeople.length - 1]);
        }
        
        // People only available in the afternoon
        
        var justAfternoonPeople = mockData.users.filter((user) => {
            return user.availabilities.length == 1 && user.availabilities.includes("afternoon");
        });
        
        for (var i = 1; i < justAfternoonPeople.length; i += 2) {
            pairs.push([ justAfternoonPeople[i - 1], justAfternoonPeople[i] ]);
        }
        
        if (justAfternoonPeople.length % 2 == 1) {
            sadPeople.push(justAfternoonPeople[justAfternoonPeople.length - 1]);
        }
        
        // People generally available
        
        var bothPeople = mockData.users.filter((user) => {
            return user.availabilities.includes("morning") && user.availabilities.includes("afternoon");
        });
        
        for (var i = 1; i < bothPeople.length; i += 2) {
            pairs.push([ bothPeople[i - 1], bothPeople[i] ]);
        }
        
        if (bothPeople.length % 2 == 1) {
            var leftoverBothPerson = bothPeople[bothPeople.length - 1];
            if (sadPeople.length > 0)
            {
                var noLongSadPerson = sadPeople.pop();
                pairs.push([leftoverBothPerson, noLongSadPerson]);
            } else {
                sadPeople.push(leftoverBothPerson);
            }
        }
        
        // People not available
        
        var unavailablePeople = mockData.users.filter((user) => { return user.availabilities.length == 0; });
        
        reply(JSON.stringify({
            "pairs": pairs,
            "leftovers": sadPeople,
            "unavailable": unavailablePeople
        }, null, 2));
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
