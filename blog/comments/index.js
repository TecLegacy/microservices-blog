const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const randomBytes = require('randombytes');

app.use(bodyParser.json());

// {id : [{commentId, content}, {commentId, content}]}
const commentsById = {};

// @GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsById[req.params.id]);
});

// @POST /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');

  const comment = commentsById[req.params.id] || [];

  comment.push({
    id,
    content: req.body.content,
  });

  res.status(201).send(comment);
});

app.listen(4001, () => {
  console.log('Listen to port 4001');
});
