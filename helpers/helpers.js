const mongoose = require('mongoose');
const User = require('../models/user');

const errors = {
  byField: {
    name: 'Ошибка в поле Name.',
    about: 'Ошибка в поле About.',
    avatar: 'Проблема с аватаркой.',
    link: 'Проблема с изображением.',
  },
  byDocType: {
    user: 'Такого пользователя нет',
    card: 'Карточка не существует',
  },
};

function joinErrorMessages(fieldErrorMap, actualError) {
  const expectedBadFields = Object.keys(fieldErrorMap);
  const actualBadFields = Object.keys(actualError.errors);
  const messageArray = [];
  let jointErrorMessage = null;
  if (expectedBadFields.some((field) => actualBadFields.includes(field))) {
    expectedBadFields.forEach((field) => {
      if (actualBadFields.includes(field)) {
        messageArray.push(fieldErrorMap[field]);
      }
    });
    jointErrorMessage = messageArray.join(' ');
  }
  return jointErrorMessage;
}

function isUserExistent(id) {
  return User.exists({ _id: id });
}

function createDocHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

function getAllOrDeleteHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
    });
}

function getUserOrLikesHandler(promise, req, res, docType) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType[docType]}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

function updateHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.user}` });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* createDocHandler */
function createUserHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* getAllOrDeleteHandler */
function getAllUsersHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
    });
}

/* getUserOrLikesHandler */
function getSingleUserHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.user}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* updateHandler */
function updateProfileHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.user}` });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* updateHandler */
function updateAvatarHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.user}` });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* getAllOrDeleteHandler */
function getAllCardsHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
    });
}

/* createDocHandler */
function createCardHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: joinErrorMessages(errors.byField, err) });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* getAllOrDeleteHandler */
function deleteCardHandler(promise, req, res) {
  promise
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
    });
}

/* getUserOrLikesHandler */
function likeCardHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.card}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

/* getUserOrLikesHandler */
function unLikeCardHandler(promise, req, res) {
  promise
    .orFail()
    .then((respObj) => res.send({ data: respObj }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: `${errors.byDocType.card}` });
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
      }
    });
}

module.exports = {
  createDocHandler,
  getAllOrDeleteHandler,
  getUserOrLikesHandler,
  updateHandler,
  errors,
  isUserExistent,
};
