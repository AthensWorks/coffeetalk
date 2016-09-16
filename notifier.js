"using strict";

var Mailgun = require('mailgun-js');
var ejs = require('ejs');

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-026f6a5a5923dfab92341d165afe9cae';

//Your domain, from the Mailgun Control Panel
var domain = 'athensworks.com';

//Your sending email address
var from_who = 'coffeetalk@athensworks.com';

var people = [{
    "name": "hi",
    "email": "ben@athensworks.com",
    "availability": "morning",
    "previousMatches": null
}];

function validate() {
    var mailgun = new Mailgun({
        apiKey: api_key,
        domain: domain
    });

    people.forEach(function(person) {
        var data = {
            //Specify email data
            from: from_who,
            //The email to contact
            to: person.email,
            //Subject and text data
            subject: 'Hello from Athensworks',
            html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + person.email + '">Click here to add your email address to a mailing list</a>'
        };

        mailgun.messages().send(data, function(err, body) {
            // If there is an error, render the error page
            if (err) {
                console.log("got an error: ", err);
            } else {
                // Else we can greet and leave
                console.log(body);
            }
        });
    });
}

function requestConfirmation() {
    var mailgun = new Mailgun({
        apiKey: api_key,
        domain: domain
    });

    people.forEach(function(person) {
        var message_data = {
            name: person.name,
            email: person.email
        };

        ejs.renderFile(__dirname + '/confirm.ejs', message_data, function(err, data) {
            console.log(err || data)

            if (data !== undefined) {
                var mailgun_data = {
                    //Specify email data
                    from: from_who,
                    //The email to contact
                    to: person.email,
                    //Subject and text data
                    subject: 'Hello from Athensworks',
                    html: data
                };

                mailgun.messages().send(mailgun_data, function(err, body) {
                    // If there is an error, render the error page
                    if (err) {
                        console.log("got an error: ", err);
                    } else {
                        // Else we can greet and leave
                        console.log(body);
                    }
                });
            }
        });
    });
}

requestConfirmation();
