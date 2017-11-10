'use strict';


const Hapi = require('hapi');
const Wreck = require('wreck');

const PORT = 3000;
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

async function getFrom (subreddit, limit) {
  const { res, payload } = await Wreck.get(`https://www.reddit.com/r/${subreddit}/top/.json?limit=${limit}`);
  return JSON.parse(payload.toString());
}

function getRequestHandler(request, reply) {
  const subreddit = request.params.subreddit;
  const limit = request.query.limit;

  getFrom(subreddit, limit)
  .then(function (raw) {
    const simple = simplify(raw);
    console.log(simple);
    reply(simple);
  });

}

const server = new Hapi.Server();
server.connection({ port: PORT, host: HOST});

server.route({
    method: 'GET',
    path: '/r/{subreddit}',
    handler: getRequestHandler
});

server.start((err) => {

  if(err) {
    throw err;
  }

  server.log('info', 'Server running at:' + server.info.uri);
});
