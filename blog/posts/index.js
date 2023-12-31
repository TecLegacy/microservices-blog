const express = require('express');
const app = express();
const axios = require('axios');

const cors = require('cors');
const randomBytes = require('randombytes');
const bodyParser = require('body-parser');

app.use(cors());
// raw-json
app.use(bodyParser.json());

// In memory -> id : hexId , title : string
const post = {};

//K8 development route
app.get('/testposts', (req, res) => {
  res.send('<h1>K8s Posts deployment pod running 1 replica</h1>');
});

// @GET /posts -> show all posts
// app.get('/posts', (req, res) => {
//   res.send(post);
// });

// @POST /posts -> store post
app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  post[id] = {
    id,
    title,
  };

  // Emitted Events
  await axios.post('http://event-bus-clusterip:4006/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(post[id]);
});

// @POST /events -> receive events
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
