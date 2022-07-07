/* eslint-disable eqeqeq */
const Card = require("../models/card");
const DataError = require("../errors/data-err");
const NotFoundError = require("../errors/not-found-err");
const RightsError = require("../errors/no-rights");

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new DataError("Переданы некорректные данные");
        next(error);
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id).orFail(() => {
    const error = new NotFoundError("Карточка с указанным id не найдена");
    next(error);
  })
    .then((card) => {
      if (req.user._id == card.owner) {
        Card.findByIdAndRemove(req.params.id)
          .then((item) => res.status(200).send({ data: item }))
          .catch((err) => {
            if (err.name === "CastError") {
              const error = new DataError("Неправильный формат _id");
              next(error);
            }
            next(err);
          });
      } else {
        throw new RightsError("У вас недостаточно прав для удаления");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new DataError("Неправильный формат _id");
        next(error);
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("user")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    const error = new NotFoundError("Карточка с указанным id не найдена");
    next(error);
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new DataError("Неправильный формат _id");
        next(error);
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    const error = new NotFoundError("Карточка с указанным id не найдена");
    next(error);
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new DataError("Неправильный формат _id");
        next(error);
      }
      next(err);
    });
};
