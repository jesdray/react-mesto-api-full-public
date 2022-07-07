const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const DataError = require("../errors/data-err");
const EmailError = require("../errors/email-err");
const NotFoundError = require("../errors/not-found-err");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id).orFail(() => {
    const error = new NotFoundError("Пользователь с таким id не найден");
    next(error);
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new DataError("Неправильный формат _id");
        next(error);
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(200).send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        }))
        .catch((err) => {
          if (err.name === "ValidationError") {
            const error = new DataError("Переданы некорректные данные");
            next(error);
          }
          if (err.name === "MongoError") {
            const error = new EmailError("Пользователь с таким email уже существует");
            next(error);
          }
          next(err);
        });
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  if (name === undefined || about === undefined) {
    const error = new DataError("Переданы некорректные данные");
    next(error);
    return;
  }
  User.findByIdAndUpdate(req.user._id, { name, about },
    { new: true })
    .orFail(() => {
      const error = new NotFoundError("Пользователь с таким id не найден");
      next(error);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (avatar === undefined) {
    const error = new DataError("Переданы некорректные данные");
    next(error);
    return;
  }
  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true, runValidators: true })
    .orFail(() => {
      const error = new NotFoundError("Пользователь с таким id не найден");
      next(error);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new DataError("Переданы некорректные данные");
        next(error);
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "secret-key", { expiresIn: "7d" }) });
    })
    .catch((next));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).orFail(() => {
    const error = new NotFoundError("Пользователь с таким id не найден");
    next(error);
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new DataError("Неправильный формат _id");
        next(error);
      }
      next(err);
    });
};
