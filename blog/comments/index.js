const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const randomBytes = require('randombytes');
const { default: axios } = require('axios');

app.use(cors());
app.use(bodyParser.json());

// {id : [{commentId, content}, {commentId, content}]}
const commentsById = {};

// @GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsById[req.params.id]);
});

// @POST /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');

  const comment = commentsById[req.params.id] || [];
  commentsById[req.params.id] = comment;
  comment.push({
    id,
    content: req.body.content,
    status: 'pending',
  });

  await axios.post('http://localhost:4006/events', {
    type: 'CommentCreated',
    data: {
      id,
      postId: req.params.id,
      content: req.body.content,
      status: 'pending',
    },
  });

  res.status(201).send(comment);
});

// @POST /events (Event Bus)
app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);

  // CommentModerated event from moderation service
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    // if (status === 'approved') {
    const comments = commentsById[postId];
    const comment = comments.find(comment => comment.id === id);

    comment.status = status;

    await axios.post('http://localhost:4006/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
    // }
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('v2');
  console.log('Listen to port 4001');
});
