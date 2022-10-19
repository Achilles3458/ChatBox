const { Schema, model } = require("mongoose");
const Message = require("./Message");

const chatRoomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [Message],
});

const ChatRoom = model("chatroom", chatRoomSchema);

module.exports = ChatRoom;
