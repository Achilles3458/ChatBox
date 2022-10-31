const { AuthenticationError } = require("apollo-server-express");
const { User, ChatRoom } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    mainUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in");
    },
    chatRooms: async () => {
      return ChatRoom.find();
    },
    chatRoom: async (parent, { roomId }) => {
      return ChatRoom.findOne({ _id: roomId });
    },
    chatRoomMessages: async (parent, { roomId }) => {
      let num = 50;
      let chatRoom = await ChatRoom.findById(roomId, {
        messages: { $slice: ["$messages", -1 * num] },
      });
      if (!chatRoom) {
        return;
      }
      return chatRoom;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(`No user found by ${username}`);
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password");
      }
      // console.log(user, "token?");
      const token = signToken(user);
      return { token, user };
    },
    createRoom: async (parent, { roomName }) => {
      const chatRoom = await ChatRoom.create({ roomName });
      return chatRoom;
    },
    addMessageToChat: async (parent, { roomId, messageText }, context) => {
      const user = await User.findById({ _id: context.user._id });
      if (context.user) {
        const message = await ChatRoom.findOneAndUpdate(
          { _id: roomId },
          { $addToSet: { messages: { messageText, username: user.username } } },
          { runValidators: true, new: true }
        );
        return message;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addChatMember: async (parent, { roomId, userId }) => {
      const chatRoom = await ChatRoom.findOneAndUpdate(
        { _id: roomId },
        { $addToSet: { members: { _id: userId } } },
        { runValidators: true, new: true }
      );
      return chatRoom;
    },
  },
};

module.exports = resolvers;
