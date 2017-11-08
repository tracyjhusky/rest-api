'use strict';


const Hapi = require('hapi');

const PORT = 3000;
const HOST = 'localhost'


function requestHandler(request, reply) {

}

const server = new Hapi.Server();
server.connection({ port: PORT, host: HOST});

server.route({
    method: 'GET',
    path: '/r/{name}',
    handler: requestHandler
});

server.start((err) => {

  if(err) {
    throw err;
  }

  server.log('info', 'Server running at:' + server.info.uri);
});
