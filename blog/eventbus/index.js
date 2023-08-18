const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

//Read Events Emitted  by Posts & comment Services
app.use(bodyParser.json());

// Event bus data store
const allEvents = [];

//Event Bus
app.post('/events', async (req, res) => {
  const event = req.body;

  allEvents.push(event);

  await axios
    .post('http://localhost:4000/events', event)
    .catch(err => console.log(err)); //Posts Service
  await axios
    .post('http://localhost:4001/events', event)
    .catch(err => console.log(err)); //Comment Service
  await axios
    .post('http://localhost:4002/events', event)
    .catch(err => console.log(err)); //Query Service
  await axios
    .post('http://localhost:4003/events', event)
    .catch(err => console.log(err)); //Moderation Service

  res.send({ status: 'OK' });
});

// Event Bus data store getter
app.get('/events', (req, res) => {
  res.send(allEvents);
});

app.listen(4006, () => {
  console.log('Listening on 4006');
});
