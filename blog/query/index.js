const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

app.use(bodyParser.json());
app.use(cors());

// query service will listen for events from event bus
// and store them in memory
const postsAndComments = {};

// helper function to get all comments from event bus after query service is restarted/down
const helperEvent = (type, data) => {
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
};

//Routes handlers
app.get('/posts', (req, res) => {
  res.send(postsAndComments);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  helperEvent(type, data);

  res.send({ status: 'OK' });
});

app.listen(4002, async () => {
  console.log(`Query service listening on port 4002`);

  // get all events from event bus after query service is restarted/down
  try {
    const res = await axios.get('http://event-bus-clusterip:4006/events');

    for (let event of res.data) {
      console.log('Processing event:', event.type);
      helperEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error);
  }
});
