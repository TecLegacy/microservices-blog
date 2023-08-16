const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

//Read Events Emitted  by Posts & comment Services
app.use(bodyParser.json());

//Event Bus
app.post('/events', (req, res) => {
  const { event } = req.body;

  axios
    .post('http://localhost:4000/events', event)
    .catch(err => console.log(err)); //Posts Service
  axios
    .post('http://localhost:4001/events', event)
    .catch(err => console.log(err)); //Comment Service
  axios
    .post('http://localhost:4002/events', event)
    .catch(err => console.log(err)); //Query Service
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
