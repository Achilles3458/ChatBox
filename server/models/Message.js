const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = messageSchema;
