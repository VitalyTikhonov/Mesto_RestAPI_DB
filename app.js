const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routerCards = require('./routes/routerCards.js');
const routerUsers = require('./routes/routerUsers.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();
app.listen(PORT);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5f2d8468c9f780916a588170',
  };

  next();
});
app.use(routerCards);
app.use(routerUsers);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
