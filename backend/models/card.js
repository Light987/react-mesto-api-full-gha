const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Неверный url',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
