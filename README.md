# rest-api

Hi, I'm James Tracy, and this is my implementation of a RESTful API for retrieving the top posts of a given subreddit.

My API can be found [here](https://safe-eyrie-78735.herokuapp.com/).

The user interface that calls this API is located [here](https://blooming-woodland-16151.herokuapp.com/).
And...
The the repository of the ui can be found [here](https://github.com/tracyjhusky/rest-api-web).

### Frameworks & Utilities
 - Hapi.js
 - Wreck.js
 - express.js for web-ui server
 - chai.js for testing


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

The API has one route that processes 'GET' requests made to the path
'/r/{subreddit}', where {subreddit} is the subreddit you wish to pull posts
from. This route also accepts a query string of the form '?limit=X',
where X is the maximum number of items to get.

A GET request made to https://safe-eyrie-78735.herokuapp.com/r/science?limit=10
for example, will make a request to Reddit's API that looks like this:
https://www.reddit.com/r/science/top/.json?limit=10. The API then strips away
a lot of unnecessary data, and returns an array of JSON objects, each carrying the
data of an individual post.

I also implemented a simple (and ugly!), but functional user-interface for making
requests to the API and displaying the results in a form similar to how they
are displayed on Reddit. Again that interface is hosted [here](https://blooming-woodland-16151.herokuapp.com/).

### Final Remarks

This was a fun project. I learned a lot of new things, as well as reinforced quite a
few familiar concepts as well.

Thank you for your time.

-James Tracy
