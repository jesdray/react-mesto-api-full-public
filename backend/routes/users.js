const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUser, getUsers, getUserById, updateProfile, updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getUser);
router.get("/:id", getUserById);
router.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateAvatar);

module.exports = router;
