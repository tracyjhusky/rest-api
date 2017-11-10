# rest-api

Hi, I'm James Tracy, and this is my implementation of a RESTful API for retrieving the top posts of a given subreddit.

My application can be found [here](https://id.heroku.com/login).

### Frameworks & Utilities
 - Hapi.js
 - Wreck.js


### Launching locally
First make sure you have [node.js](https://nodejs.org/) installed on your machine.
```bash
git clone https://github.com/tracyjhusky/rest-api.git
cd rest-api
npm install
npm start
```
There should now be a local instance of the server running on your machine.
Try sending an http request to it!

```
localhost:3000/r/science?limit=20
```

This request should retrieve the top 20 posts from r/science!

### Details

Blah blah blah...
