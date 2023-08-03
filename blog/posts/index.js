const express = require('express');
const app = express();

const randomBytes = require('randombytes');
const bodyParser = require('body-parser');

// raw-json
app.use(bodyParser.json());

// In memory -> id : hexId , title : string
const post = {};

// @POST /posts -> store post
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  post[id] = {
    id,
    title,
  };
  res.status(201).send(post[id]);
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
