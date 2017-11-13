function getPosts() {
  const subreddit = document.getElementById('subreddit').value;
  const limit = document.getElementById('limit').value;

  fetch(`http://localhost:3000/${subreddit}?limit=${limit}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      clearPosts();
      for(let i = 0; i < data.length; i++) {
        addPost(data[i]);
      }
    });
}

function clearPosts() {
  const container = document.getElementById("container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function addPost(post) {

  const thumb = document.createElement("img");
  thumb.setAttribute("src", post.thumbnail);
  thumb.setAttribute("class", "thumbnail");
  thumb.setAttribute("align", "left");

  const title = document.createElement("div");
  title.setAttribute("class", "title");
  title.appendChild(thumb);
  title.appendChild(document.createTextNode(post.title));

  const score = document.createElement("div");
  score.setAttribute("class", "score");
  score.appendChild(document.createTextNode("▲" + post.score));

  const info = document.createElement("div");
  info.setAttribute("class", "info");
  info.appendChild(document.createTextNode("posted by u/" + post.author
    + " | " + post.num_comments + " comments"));

  const newPost = document.createElement("div");
  newPost.setAttribute("class", "post");
  newPost.appendChild(title);
  newPost.appendChild(score);
  newPost.appendChild(info);

  document.getElementById("container").appendChild(newPost);
}
