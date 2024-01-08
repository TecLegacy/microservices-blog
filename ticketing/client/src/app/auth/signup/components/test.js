const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todoDB, ConnectToDB } = require('./db');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.json()); // use middle ware

app.get('/', function (req, res) {
  res.send('My connection');
});
app.post('/todo', async function (req, res) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(411).json({
      msg: 'You sent the wrong inputs ',
    });
    return;
  }
  await todoDB.create({
    title: createPayload.title,
    description: createPayload.description,
  });
  res.json({
    msg: 'your todo is created',
  });
});
// app.get("/todos", async function (req, res) {
//   const todos = await todoDB.find({});
//   res.json({
//     todos,
//   });
// });
// app.put("/completed", async function (req, res) {
//   const updatePayload = req.body;
//   const parsePayload = updateTodo.safeParse(updatePayload);

//   if (!parsePayload.success) {
//     res.status(411).json({
//       msg: "You sent the wrong inputs",
//     });
//     return;
//   }

//   await todoDB.update(
//     {
//       _id: req.body.id,
//     },
//     {
//       completed: true,
//     }
//   );
//   res.json({
//     msg: "ToDo marked as completed",
//   });
// });
ConnectToDB();

mongoose.connection.once('open', function () {
  console.log('open connected');
  app.listen(3089, function () {
    console.log('app listeningg1');
  });
});
