const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// query service will listen for events from event bus
// and store them in memory

const postsAndComments = {};

app.get('/posts', (req, res) => {
  res.send(postsAndComments);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    postsAndComments[id] = { id, title, Comments: [] };
  }

  if (type === 'CommentCreated') {
    // const postId = postsAndComments[data.postId];
    const { id, content, postId, status } = data;

    //comments exists
    const comments = postsAndComments[postId]?.Comments || [];
    comments.push({
      id,
      content,
      status,
    });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const comments = postsAndComments[postId]?.Comments || [];
    const comment = comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log(`Query service listening on port 4002`);
});
