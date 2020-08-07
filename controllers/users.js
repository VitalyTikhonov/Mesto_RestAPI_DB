const User = require('../models/user');
const { controllerPromiseHandler } = require('../helpers/helpers');

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  controllerPromiseHandler(User.create({ name, about, avatar }), req, res);
  // User.create({ name, about, avatar })
  //   .then((user) => res.send({ data: user }))
  //   .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getAllUsers(req, res) {
  controllerPromiseHandler(User.find({}), req, res);
  // User.find({})
  // .then((users) => res.send({ data: users }))
  // .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getSingleUser(req, res) {
  controllerPromiseHandler(User.findById(req.params.id), req, res);
  // User.findById(req.params.id)
  // .then((user) => res.send({ data: user }))
  // .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
};
