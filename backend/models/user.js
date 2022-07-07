/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-character-class */
/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AuthorizationError = require("../errors/authorization-err");

validator.isEmail("foo@bar.com");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    match: [/https?:\/\/(www\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*/g],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError("Неправильные почта или пароль"));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError("Неправильные почта или пароль"));
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
