const chai = require('chai');


const should = chai.should();


const index = require('../src/index.js');
const testData = require("./test_data")


const expected = [
  {
    "subreddit": "science",
    "title": "Moderate alcohol consumption improves foreign language skills",
    "score": 36310,
    "thumbnail": "https:\/\/a.thumbs.redditmedia.com\/uWnTdW5pMkiCB3s3Ek5xCrgsTO4Vd3O4pOOYAzLkJK4.jpg",
    "author": "HeinieKaboobler",
    "num_comments": 1938
  },
  {
    "subreddit": "science",
    "title": "Research published in the journal Prevention Science finds that adolescent cannabis use has not increased in states that have legalized medical marijuana.",
    "score": 12935,
    "thumbnail": "https:\/\/a.thumbs.redditmedia.com\/o6-E44izBxquLj5aC31O34LXoaJ45J1YoZXlU1GIKg0.jpg",
    "author": "ekser",
    "num_comments": 517
  }
]

describe('index.js', function() {
  describe('#simplify', function() {
    it('should return a simplified list', function() {
      const simple = index.simplify(testData);
      simple.should.deep.equal(expected);
    });
  });
  describe('#getFrom', function() {
    it('should call Wreck.get once with correct URL', function() {
      const mockWreck = {
        get(url) {
          this.url = url;
          this.count += 1;
          return Promise.resolve();
        },
        count: 0,
        url: ''
      }
      index.getFrom('r/science', '20', mockWreck)
        .catch(function(err) {
          return;
      });
      mockWreck.count.should.equal(1);
      mockWreck.url
        .should.equal('https://www.reddit.com/r/r/science/top/.json?limit=20');
    });
  });
  describe('#getRequestHandler', function() {
    it('should call getFrom with subreddit and limit data', function() {
      let testSubreddit = '';
      let testLimit = 0;

      const mockGetFrom = function(subreddit, limit) {
        testSubreddit = subreddit;
        testLimit = limit;
        return Promise.resolve(testData);
      };

      const mockRequest = {
        params: {
          subreddit: 'r/science'
        },
        query: {
          limit: 10
        }
      };

      const mockReply = function() {
        return Promise.resolve();
      }

      index.getRequestHandler(mockRequest, mockReply, mockGetFrom);

      testSubreddit.should.equal('r/science');
      testLimit.should.equal(10);
    });
  });
  describe('#makeServer', function() {
    it('should create server at localhost:3000', function() {
      const server = index.makeServer();
      server.info.uri.should.equal('http://localhost:3000');
    });
  });
  describe('#getRoute', function() {
    it('should add route for GET /r/{subreddit}', function() {
      let testRoute = {};
      const mockServer = {
        route(route) {
          testRoute = route;
        }
      };

      index.getRoute(mockServer);
      testRoute.method.should.equal('GET');
      testRoute.path.should.equal('/r/{subreddit}');
    });
  });
});
