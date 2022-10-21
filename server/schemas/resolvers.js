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
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      return user;
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(`No user found by ${username}`);
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password");
      }

      return user;
    },
    createRoom: async (parent, { roomName }) => {
      const chatRoom = await ChatRoom.create({ roomName });
      return chatRoom;
    },
  },
};

module.exports = resolvers;
