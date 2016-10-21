'use strict';

const hapi      = require('hapi');
const server    = new hapi.Server();
const validator = require('validator');
const mongoose  = require('mongoose');
const Person    = mongoose.model('Person',
                      { name: {
                          type: String,
                          required: true
                        },
                        email: {
                          type: String,
                          required: true,
                          unique: true,
                          validator: (value) =>
                             validator.isEmail(value)
                        },
                        availability: {
                          type: String,
                          enum: ["morning", "afternoon", "both", "none"]
                        }
                     }
                  );

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/coffee-talk');

server.connection({ port: process.env.PORT || 3000 });

server.register([require('vision'), require('inert')], (err) => {
  server.views({
    engines: {
        ejs: require('ejs')
    },
    relativeTo: __dirname,
    path: 'templates'
  });

  server.route({
      method: 'GET',
      path: '/',
      handler: {
          view: 'index'
      }
  });

  server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, reply) {
      const { name, email, availability } = request.payload
      const person = new Person({ name, email, availability })

      person.save(function (err) {
        if (err) {
          console.log(err)
          reply.redirect('/?signup=failure')
        } else {
          reply.redirect('/?signup=success')
        }
      })
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'assets',
        listing: true
      }
    }
  });
});

// route unsubscribe email
  server.route({
      method: 'GET',
      path: '/unsubscribe',
      handler: function(request, reply) {
          const { email } = request.query

          Person.findOneAndRemove({email: email}, function(err, person) {
              if (err){
                  console.log(err)
                  reply.redirect('/?message="User does not exist"')
              }else{
                  reply.redirect('/?message="You have been unsubscribed"')
              }
          });
      }
  });

server.start((err) => {
  if (err) {
    throw err
  }

  console.log(`Server running at: ${server.info.uri}`)
});