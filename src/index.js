'use strict';


const Hapi = require('hapi');
const Wreck = require('wreck');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost'

function simplify(raw) {
  const children = raw.data.children;
  const list = [];
  for(let i  = 0; i < children.length; i++) {
    const data = children[i].data;
    list.push(
      {
        subreddit: data.subreddit,
        title: data.title,
        score: data.score,
        thumbnail: data.thumbnail,
        author: data.author,
        num_comments: data.num_comments,
      }
    );
  }
  return list;
}

async function getFrom (subreddit, limit, wreck) {
  if(wreck != undefined) {
    wreck.get(`https://www.reddit.com/r/${subreddit}/top/.json?limit=${limit}`)
  }
  const { res, payload } = await Wreck.get(`https://www.reddit.com/r/${subreddit}/top/.json?limit=${limit}`);
  return JSON.parse(payload.toString());
}

function getRequestHandler(request, reply, get) {
  const subreddit = request.params.subreddit;
  const limit = request.query.limit;

  if(get != undefined) {
    get(subreddit, limit);
  }
  else {
    getFrom(subreddit, limit)
    .then(function (raw) {
      const simple = simplify(raw);
      reply(simple);
    });
  }

}

function makeServer() {
  const server = new Hapi.Server();
  server.connection({ port: PORT, host: HOST});
  return server;
}

function getRoute(server) {
  server.route({
      method: 'GET',
      path: '/r/{subreddit}',
      handler: getRequestHandler,
      config: {
          cors: {
              origin: ['*'],
              additionalHeaders: ['cache-control', 'x-requested-with']
          }
      }
  });
}

function startServer(server) {
  server.start((err) => {

    if(err) {
      throw err;
    }

    server.log('info', 'Server running at:' + server.info.uri);
  });
}

const server = makeServer();
getRoute(server);
startServer(server);

module.exports = {
  simplify,
  getFrom,
  getRequestHandler,
  makeServer,
  getRoute
}
