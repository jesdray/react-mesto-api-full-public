const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require("../controllers/cards");

router.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2),
  }),
}), createCard);

router.delete("/:id", deleteCard);
router.get("/", getCards);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
